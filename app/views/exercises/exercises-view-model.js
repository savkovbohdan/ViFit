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

screen = platform.screen;
scale = screen.mainScreen.scale;
function HomeViewModel() {
  var viewModel = observableModule.fromObject({


    exercises: new ObservableArray(),

    loadExarcises: function () {
      var fullTimes = 0;
      var exercisesCount=0;
      var complateCount = 0;
      viewModel.exercises =  new ObservableArray();
      needDay = null;
      needUserDay = null;
      searchWorkoutId = viewModel.info.key;
      api.getWorkout(searchWorkoutId).then((workoutData) => {
        if(typeof workoutData.value.days != "undefined"){
       //   workoutData.value.days = [];
        }

        arrayDays =  Object.entries(workoutData.value.days);
        arrayDays =  arrayDays.sort((a, b) => {
          if (a[1].index <=  b[1].index)
            return -1;
          else 1
        });



        api.getUserWorkouts().then((data) => {
          if (typeof data.value != "undefined") {
            workouts = Object.assign({}, data.value);
            for (workout in workouts) {
              if(needDay != null)
                break
              if (typeof workouts[workout].idWorkout != "undefined" && workouts[workout].idWorkout == searchWorkoutId) {
                if (typeof workouts[workout].days != "undefined") {
                  userArrayDay = workouts[workout].days;
                  for(day in arrayDays){
                    if(needDay != null)
                       break
                    for(userDay in userArrayDay){
                      if(needDay != null)
                       break
                      if(userArrayDay[userDay].idDay == arrayDays[day][0]){
                        if(userArrayDay[userDay].isComplate != true){
                           needDay = arrayDays[day][1];
                           needUserDay = userArrayDay[userDay];
                        }
                      }
                    }
                  }
                }else{

                 
                  needDay = arrayDays[0][1];
                  needUserDay = [];
                  console.log(needDay);

                }
              }
            }


            console.log("11");

            if(typeof needDay == "undefined" || needDay == null){
              console.log("Программа завершина");
            }else{
              //нашли нужный день

              if(typeof needDay.exercises != "undefined" ){
                exercises =  Object.entries(needDay.exercises);
                exercises =  exercises.sort((a, b) => {
                  if (a[1].index <=  b[1].index)
                    return -1;
                  else 1
                });

                for(ex in exercises){


                  if(typeof needUserDay.exercises != "undefined"){
                    for(ud in needUserDay.exercises){
                      if(exercises[ex][0] == needUserDay.exercises[ud].idExercises &&
                        needUserDay.exercises[ud].isComplate == true){
                        exercises[ex][1].isComplate = true;
                        complateCount++;
                        break;
                      }
                    }
                  }else {
                    exercises[ex][1].isComplate = false;
                  }
                  
                  setsCount = 0;
                  times = 0
                 
                  if(typeof exercises[ex][1].sets != "undefined"){
                    for(set in exercises[ex][1].sets){
                     
                      if(typeof exercises[ex][1].sets[set].time != "undefined"){
                        times += exercises[ex][1].sets[set].time;
                        fullTimes += exercises[ex][1].sets[set].time;
                      }

                      if(typeof exercises[ex][1].sets[set].relaxTime != "undefined"){
                        //times += exercises[ex][1].sets[set].relaxTime;
                        fullTimes += exercises[ex][1].sets[set].relaxTime;
                      }
                      
                      setsCount++;
                    }
                    exercises[ex][1].setsCount = setsCount;
                    exercises[ex][1].times = times/60;
                  }

                 
                  if(ex == 0){
                    exercises[ex][1].isFirst = true;
                  }
                  if(exercises.length -1 == ex){
                    exercises[ex][1].isLast = true;
                  }
                  viewModel.exercises.push(exercises[ex][1]);
                }

                viewModel.set("progress", exercises.length-1 * 100 / complateCount);
              }

            }
          }
          console.log("количесвтв:" + viewModel.exercises.length);
          viewModel.set("exercisesCount",  viewModel.exercises.length);
          viewModel.set("fullTime", (fullTimes/60)  + "");
          


        }).catch((error) => {
          console.log(error);
        })




        
      

/*
        api.getUserWorkouts().then((data) => {


          if (typeof data.value != "undefined") {

            workouts = Object.assign({}, data.value);
            for (workout in workouts) {
              if (typeof workouts[workout].idWorkout != "undefined" && workouts[workout].idWorkout == searchWorkoutId) {

                if (typeof workouts[workout].days != "undefined") {

                  if(typeof workoutData.days != "undefined"){

                    arrayDays =  Object.entries(workoutData.days);
                    arrayDays =  arrayDays.sort((a, b) => {
                      if (a[1].index >=  b[1].index)
                        return -1;
                      else 1
                    });

                    console.log(arrayDays);

                  }

                }

              }
            }

          }
        }).catch((error) => {
          console.log(error);
        })
        */
      }).catch((error) => {
        console.log(error);
      })




    },
    run: function () {
      viewModel.set("title", viewModel.info.name);
      viewModel.loadExarcises();
      api.screenSettings();
    },

    openVideo: function(args){
      data = args.object.bindingContext;
      el = viewModel.page.getElementsByClassName('video')[0];
      el.src = data.video;
      el.play();
      viewModel.popupOpen();
    },
    navigateToExercise: function(args){
      api.navigateToExercise(viewModel.exercises);
    },

    navigateBack: function (args) {
      viewModel.page.frame.goBack();
    },
    popupOpen:function(){
      el = viewModel.page.getElementsByClassName('popup')[0];
      el.animate({
        translate:{x:0, y:0},
        opacity:1,
        duration: 800,
        curve: enums.AnimationCurve.easeInOut
      }).then(function(){
    
      });
    },

    popupClose:function(){
      el = viewModel.page.getElementsByClassName('popup')[0];
      el.animate({
        translate:{x:0, y:1000},
        opacity:0,
        duration: 500,
        curve: enums.AnimationCurve.easeInOut
      }).then(function(){
       
      });

      viewModel.page.getElementsByClassName('video')[0].pause();
      viewModel.page.getElementsByClassName('video')[0].src = "";
      
    }

  });
  return viewModel;
}
module.exports = HomeViewModel;

