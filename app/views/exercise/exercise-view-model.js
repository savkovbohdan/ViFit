var observableModule = require("tns-core-modules/data/observable");
require("nativescript-dom");
var enums = require("tns-core-modules/ui/enums");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var api = require("../../js/api-firebase-module");
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
    userData:{},
    repeatExercise: 0,
    totalTime: 0,
    startTime: 0,
    secondsProgress: 0,
    nextExercise: {},
    exerciseStatus: 0, //0 - выполнение, 1 - отдых
    exercises: new ObservableArray(),
    pauseState: false,
    run: function () {
      api.screenSettings();
      if (viewModel.pauseState != true) {
        viewModel.play();
      }
    },

    play: () => {
      if (viewModel.flagTime) {
        viewModel.exerciseStart();
        viewModel.timingF();
      }
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
        viewModel.exerciseEvent();
      }, 10);
    },
    complateExercise:(exercise) => {
      if(exercise.url.workoutUserDayId != null)
        viewModel.workoutUserDayId = exercise.url.workoutUserDayId;
      if(viewModel.workoutUserDayId == null){
        api.pushUserData("workouts/" + exercise.url.workoutUserId + "/days", {idDay:exercise.url.workoutIdDay}).then((data) => {
          viewModel.workoutUserDayId = data.key;
           api.pushUserData("workouts/" + exercise.url.workoutUserId + "/days/" + data.key + "/exercises", {idExercises:exercise.url.idExercise, isComplate:true}).then((data) => {
         });
        });
     }else {
      api.pushUserData("workouts/" + exercise.url.workoutUserId + "/days/" + viewModel.workoutUserDayId + "/exercises", {idExercises:exercise.url.idExercise, isComplate:true}).then((data) => {
      });
     }
    },

    complateWorkout: (url) => {
     api.updatePowerPoints(parseInt(viewModel.userData.userModel.data.powerPoints)+ 10);
      data = {
        workoutTime: Date.now() - viewModel.startTimeTraining,
        idWorkout: url.idWorkout,
        idDay: url.workoutIdDay
      };
      api.pushStatistics(data, "workout");
      api.setUserDataUrl("workouts/" + url.workoutUserId + "/days/" + viewModel.workoutUserDayId, {isComplate: true, userDateComplate: Date.now()});
    },



    exerciseEvent: () => {
      viewModel.totalTime = Date.now() - viewModel.startTime;
      if (viewModel.exerciseStatus == 0) {
        viewModel.secondsProgress = Math.ceil((viewModel.exercise.set[viewModel.setIndex][1].time * 1000 - viewModel.totalTime) / 1000);
        viewModel.progress = 100 - ((viewModel.secondsProgress - 1) / viewModel.exercise.set[viewModel.setIndex][1].time * 100);
        if (viewModel.totalTime >= viewModel.exercise.set[viewModel.setIndex][1].time * 1000) {
          //время упражнения завершено
          console.log("Установило сотстояние");
          viewModel.exerciseStatus = 1;
          viewModel.totalTime = 0;
          viewModel.startTime = Date.now();
          //Окончание упражнения
          if (viewModel.exercise.set.length - 1 == viewModel.setIndex) {
            viewModel.complateExercise(viewModel.exercise);
          }
          //Окончание трени
          if(viewModel.exercise.set.length - 1 == viewModel.setIndex && viewModel.exercises._array.length - 1 == viewModel.exerciseIndex) {
            viewModel.pause();
            viewModel.complateWorkout(viewModel.exercise.url);
          }
        }
      }
      if (viewModel.exerciseStatus == 1) {//отдых
        viewModel.secondsProgress = Math.ceil((viewModel.exercise.set[viewModel.setIndex][1].relaxTime * 1000 - viewModel.totalTime) / 1000);
        viewModel.progress = ((viewModel.secondsProgress - 1) / viewModel.exercise.set[viewModel.setIndex][1].relaxTime * 100);
        if (viewModel.totalTime >= viewModel.exercise.set[viewModel.setIndex][1].relaxTime * 1000) {
          viewModel.exerciseStatus = 0;
          if (viewModel.exercise.set.length - 1 == viewModel.setIndex) { //Прверка на выпоненные сеты
            if (viewModel.exercises._array.length - 1 != viewModel.exerciseIndex) { //Проверка на оставшиеся упражнения
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
      console.log(viewModel.userData);
      ex = Object.assign({}, viewModel.exercises._array[viewModel.exerciseIndex]);
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
      //Следующие упражнение
      if (viewModel.exercises._array.length - 1 >= viewModel.exerciseIndex + 1) {

        console.log(viewModel.nextExercise);
        viewModel.nextExercise = Object.assign({}, viewModel.exercises._array[viewModel.exerciseIndex + 1]);
      }
    },
    navigateBack: function (args) {
      viewModel.page.frame.goBack();
    },
  });
  return viewModel;
}
module.exports = HomeViewModel;

