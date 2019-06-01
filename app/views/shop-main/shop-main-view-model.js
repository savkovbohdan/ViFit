var observableModule = require("tns-core-modules/data/observable");
require("nativescript-dom");
var enums = require("tns-core-modules/ui/enums");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const Observable = require("tns-core-modules/data/observable").Observable;
var api = require("../../js/api-firebase-module");
var platform = require("tns-core-modules/platform");
const appSettings = require("application-settings");
screen = platform.screen;

scale = screen.mainScreen.scale;
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    recommendations: [],
    populars: [],
    workouts: [],
    searchResult: new ObservableArray(),
    searchText: '',
    searchState: false,
    search: function (args) {
      if (!viewModel.searchState) {
        viewModel.searchState = true;
        viewModel.page.getElementsByClassName('btn-search-no-active')[0].classList.add("btn-search");
        viewModel.page.getElementsByClassName('input-search')[0].classList.add("input-search-active");
        viewModel.page.getElementsByClassName('title-search')[0].animate({
          opacity: 0,
          duration: 400,
          curve: enums.AnimationCurve.easeOut
        });
        viewModel.page.getElementsByClassName('text-input')[0].focus()
        viewModel.on(Observable.propertyChangeEvent, function (propertyChangeData) {
          // console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
          if (propertyChangeData.propertyName == "searchText") {
            viewModel.searchResult = new ObservableArray();
            for (key in viewModel.workouts) {
              if (viewModel.workouts[key].name.toLowerCase().includes(viewModel.searchText.toLowerCase()))
                viewModel.searchResult.push(viewModel.workouts[key]);
            }
            if (viewModel.searchText.replace(/\s+/g, '').length == 0) {
              viewModel.searchResult = [];
            }
          }
        });
      } else {
        viewModel.searchState = false;
        viewModel.searchResult = [];
        viewModel.searchText = "";
        viewModel.page.getElementsByClassName('btn-search-no-active')[0].classList.remove("btn-search");
        viewModel.page.getElementsByClassName('input-search')[0].classList.remove("input-search-active");
        viewModel.page.getElementsByClassName('title-search')[0].animate({
          opacity: 1,
          duration: 400,
          curve: enums.AnimationCurve.easeOut
        });
      }
    },
    run: function () {
      fl = false;
      api.getAllWokouts().then(result => {
        viewModel.workouts = result;
        var userModel = appSettings.getString("userModel");
        if (typeof userModel != "undefined") {
          userModel = JSON.parse(userModel);
        

          if(typeof userModel != "undefined" && 
          typeof userModel.data != "undefined"  && 
          typeof userModel.data.sportLevel != "undefined"){
            fl = true;
            viewModel.recommendations = api.workoutsByLevel(userModel.data.sportLevel, result);
          }
        }

        viewModel.populars = api.wokoutsByLike(result);
        if(!fl){
          api.getUserData().then(userData => {
              if(typeof userData.value != "undefined" &&
              typeof userData.value.sportLevel != "undefined")
              
              viewModel.recommendations = api.workoutsByLevel(userData.value.sportLevel, result);
              console.log(api.workoutsByLevel(userData.value.sportLevel, result));

          });
        }        
      });
    },

    navigateToWorkout: (args) => {
      api.navigateToWorkout(args.object.bindingContext);
    }
  });
  return viewModel;
}
module.exports = HomeViewModel;

