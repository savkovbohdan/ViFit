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
var gF = require("../../js/global-functions");
screen = platform.screen;
scale = screen.mainScreen.scale;
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    exercises: [],
    isContinue: false,
    loadExarcises: function () {
      viewModel.exercises = [];
      searchWorkoutId = viewModel.info.key;
      var url = {};
      api.getWorkout(searchWorkoutId).then((workoutData) => {
        arrayDays =  Object.entries(workoutData.value.days);
        api.getUserWorkouts().then((data) => {
          if (typeof data.value != "undefined") {
            var infoWorkout = gF.getCurrentWorkout(searchWorkoutId, workoutData.value, data.value);
            if(infoWorkout != null) {
              viewModel.set("progress", ((infoWorkout.countComplateExercise) / infoWorkout.countExercise * 100));
              viewModel.set("exercisesCount",  infoWorkout.countExercise);
              viewModel.set("fullTime", infoWorkout.timeWorkout  + "");
              if(infoWorkout.countComplateExercise != 0 && infoWorkout.countExercise != infoWorkout.countComplateExercise)
                viewModel.isContinue = true;
              /*for(ex in listExercises){
                viewModel.exercises.push(listExercises[ex]);
              }*/
              viewModel.exercises = infoWorkout.listExercises;
            }
          }
        }).catch((error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
      })
    },
    run: function () {
      viewModel.set("title", viewModel.info.name);
      viewModel.set("poster", viewModel.info.poster);
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
      api.navigateToExercise(viewModel.exercises, viewModel.mainContext);
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

