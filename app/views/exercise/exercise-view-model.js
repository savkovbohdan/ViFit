var observableModule = require("tns-core-modules/data/observable");
require("nativescript-dom");
var enums = require("tns-core-modules/ui/enums");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var api = require("../../js/api-firebase-module");
var gF = require("../../js/global-functions");
var platform = require("tns-core-modules/platform");
const Button = require("tns-core-modules/ui/button").Button;
const StackLayout = require("tns-core-modules/ui/layouts/stack-layout").StackLayout;
const Label = require("tns-core-modules/ui/label").Label;
var animations = require("../../js/animation-module");
const timerModule = require("tns-core-modules/timer");
screen = platform.screen;
scale = screen.mainScreen.scale;
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    flagTime: true,
    setIndex: 0,
    progress: 0,
    exerciseIndex: 0,
    startTimeTraining: Date.now(),
    timer: 0,
    timerObj: null,
    workoutUserDayId: null,
    exercise: {},
    userData: {},
    repeatExercise: 0,
    totalTime: 0,
    startTime: 0,
    tempSpeakStatus: -1,
    secondsProgress: 0,
    nextExercise: {},
    exerciseStatus: 0, //0 - выполнение, 1 - отдых
    exercises: new ObservableArray(),
    pauseState: false,
    nextPress:false,
    mute:false,
    repeatWorkout: false,
    run: function () {
      api.screenSettings();

      countComplate = 0;
      for(key in viewModel.exercises){
        if(viewModel.exercises[key].isComplate == true){
          countComplate++;
        }
      }

      if(viewModel.exercises.length == countComplate){
        viewModel.repeatWorkout = true;
        console.log("Вы уже прошли треню")
      }


      if (viewModel.pauseState != true) {
        viewModel.play();
      }

    },
    next: () =>{
      console.log("next");
    },
    play: () => {
      if (viewModel.flagTime) {
        viewModel.exerciseStart();
        viewModel.timingF();
      }
    },

    refresh:() =>{
      viewModel.exerciseStart();
    },

    muted:() =>{
      if(viewModel.mute)
       viewModel.mute = false;
      else
       viewModel.mute = true;
    },
    
    pause: () => {
      if (viewModel.timerObj != null) {
        viewModel.flagTime = true;
        viewModel.pauseState = true;
        clearInterval(viewModel.timerObj);
      }
    },
    timingF: function () {
      viewModel.flagTime = false;
      viewModel.timerObj = timerModule.setInterval(() => {
        viewModel.timer++;
        viewModel.trainerSpeek();
        viewModel.exerciseEvent();
      }, 10);
    },
    trainerSpeek: () => {
      if( viewModel.mute == false){
      if (viewModel.tempSpeakStatus != viewModel.exerciseStatus) {
        if (viewModel.exerciseStatus == 0) {
          gF.speak("Выполнить " + viewModel.exercise.name + " " + viewModel.repeatExercise + " раз");
        } else {
          gF.speak("Отдых " + viewModel.exercise.set[viewModel.setIndex][1].relaxTime + "секунд");
        }
        viewModel.tempSpeakStatus = viewModel.exerciseStatus;
      }
    }
    },
    complateExercise: (exercise) => {
      viewModel.exercises[viewModel.exerciseIndex].isComplate = true;
    
      if(!viewModel.repeatWorkout){
      if (exercise.url.workoutUserDayId != null)
        viewModel.workoutUserDayId = exercise.url.workoutUserDayId;
      if (viewModel.workoutUserDayId == null) {
        api.pushUserData("workouts/" + exercise.url.workoutUserId + "/days", { idDay: exercise.url.workoutIdDay }).then((data) => {
          viewModel.workoutUserDayId = data.key;
          api.pushUserData("workouts/" + exercise.url.workoutUserId + "/days/" + data.key + "/exercises", { idExercises: exercise.url.idExercise, isComplate: true }).then((data) => {
          });
        });
      } else {
        api.pushUserData("workouts/" + exercise.url.workoutUserId + "/days/" + viewModel.workoutUserDayId + "/exercises", { idExercises: exercise.url.idExercise, isComplate: true }).then((data) => {
        });
      }
    }
   
    },
    complateWorkout: (url) => {
      if(!viewModel.repeatWorkout){
      api.updatePowerPoints(parseInt(viewModel.userData.userModel.data.powerPoints) + 10);
      data = {
        workoutTime: Date.now() - viewModel.startTimeTraining,
        idWorkout: url.idWorkout,
        idDay: url.workoutIdDay
      };
      api.pushStatistics(data, "workout");
      api.setUserDataUrl("workouts/" + url.workoutUserId + "/days/" + viewModel.workoutUserDayId, { isComplate: true, userDateComplate: Date.now() });
    }
    },

    exerciseEvent: () => {
      viewModel.totalTime = Date.now() - viewModel.startTime;
      if (viewModel.exerciseStatus == 0) {
        viewModel.secondsProgress = Math.ceil((viewModel.exercise.set[viewModel.setIndex][1].time * 1000 - viewModel.totalTime) / 1000);
        viewModel.progress = 100 - ((viewModel.secondsProgress - 1) / viewModel.exercise.set[viewModel.setIndex][1].time * 100);
        if (viewModel.totalTime >= viewModel.exercise.set[viewModel.setIndex][1].time * 1000) {
          viewModel.exerciseStatus = 1;
          viewModel.totalTime = 0;
          viewModel.startTime = Date.now();
          //Окончание упражнения
          if (viewModel.exercise.set.length - 1 == viewModel.setIndex) {
            viewModel.complateExercise(viewModel.exercise);
          }
          //Окончание трени

          var countComplate = 0;
          for(key in viewModel.exercises){
            if(viewModel.exercises[key].isComplate == true){
              countComplate++;
            }
          }
          if (viewModel.exercise.set.length - 1 == viewModel.setIndex && viewModel.exercises.length == countComplate) {
            viewModel.pause();
            console.log("complate");
            viewModel.complateWorkout(viewModel.exercise.url);
          } else {
          }
        }
      }
      if (viewModel.exerciseStatus == 1) {//отдых
        viewModel.secondsProgress = Math.ceil((viewModel.exercise.set[viewModel.setIndex][1].relaxTime * 1000 - viewModel.totalTime) / 1000);
        viewModel.progress = ((viewModel.secondsProgress - 1) / viewModel.exercise.set[viewModel.setIndex][1].relaxTime * 100);
        if (viewModel.totalTime >= viewModel.exercise.set[viewModel.setIndex][1].relaxTime * 1000) {
          viewModel.exerciseStatus = 0;
          var countComplate = 0;
          for(key in viewModel.exercises){
            if(viewModel.exercises[key].isComplate == true){
              countComplate++;
            }
          }
          if (viewModel.exercise.set.length - 1 == viewModel.setIndex) { //Прверка на выпоненные сеты
            if (viewModel.exercises.length - 1 != viewModel.exerciseIndex) { //Проверка на оставшиеся упражнения
              viewModel.setIndex = 0;
              viewModel.exerciseIndex++;
            }
          } else {
            if (viewModel.exercise.set.length - 1 != viewModel.setIndex)
              viewModel.setIndex++;
          }
          viewModel.exerciseStart();
        }
      }
    },
    exerciseStart: () => {

      flagNext = false;
      var nextIndex = -1;
      if(viewModel.nextPress == false)
      for(key in viewModel.exercises){
        if(viewModel.exercises[key].isComplate != true){
          if(flagNext){
            nextIndex = key;
            break;
          }else {
            viewModel.exerciseIndex = key;
            flagNext = true
          }
        }
      }


      
      ex = Object.assign({}, viewModel.exercises[viewModel.exerciseIndex]);
      ex.sets = Object.entries(ex.sets);
      ex.set = ex.sets.sort((a, b) => {
        if (a[1].index <= b[1].index)
          return -1;
        else 1
      });
      viewModel.set("repeatExercise", ex.set[viewModel.setIndex][1].count);
      if (viewModel.pauseState == true) {
        viewModel.startTime = Date.now() - viewModel.totalTime;
        viewModel.pauseState = false;
      } else {
        viewModel.startTime = Date.now();
      }
      viewModel.exercise = ex;
      setTimeout(() => {
        viewModel.page.getElementsByClassName('videos')[0].mute(true);
      }, 200);

      if (nextIndex != -1) {
        viewModel.nextExercise = Object.assign({}, viewModel.exercises[nextIndex]);
      }else{

        
        if(viewModel.exerciseIndex  <  viewModel.exercises.length-1 )
          viewModel.nextExercise = Object.assign({}, viewModel.exercises[viewModel.exerciseIndex + 1]);
        else
        viewModel.nextExercise = Object.assign({}, viewModel.exercises[0]);
      }

    },
    navigateBack: function (args) {
      viewModel.page.frame.goBack();
    },
  });
  return viewModel;
}
module.exports = HomeViewModel;

