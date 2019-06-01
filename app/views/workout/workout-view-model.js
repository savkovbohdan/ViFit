var observableModule = require("tns-core-modules/data/observable");
require("nativescript-dom");
var enums = require("tns-core-modules/ui/enums");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const Observable = require("tns-core-modules/data/observable").Observable;
var api = require("../../js/api-firebase-module");
var platform = require("tns-core-modules/platform");
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
screen = platform.screen;
scale = screen.mainScreen.scale;
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    workout:{},
    level: "",
    isLike: false,
    likeCount: 0,
    isAddWorkout: false,
    listenerOn: false,
    qustionText: 'Добавить программу в  расписание ?',
    qustionPopupBtnFirst: 'Да',
    qustionPopupBtnSecond: 'Нет',
    run:  () => {
      viewModel.loadData();

      var level = "";
      switch (viewModel.workout.level) {
        case 0:
          level = "Низкий уровень подготовки"
          break;
        case 1:
          level = "Средний уровень подготовки"
          break;
        case 2:
          level = "Высокий уровень подготовки"
        case 3:
          level = "Очень выский уровень подготовки"
          break;
        default:
          level = 'Подойдет для любого уровня подготовки';
      } 
      viewModel.level = level;
      viewModel.likeCount = viewModel.workout.likeCount;
      api.isFavorite(viewModel.workout.uid).then(data => {
        if (JSON.stringify(data.value) != "{}") {
          viewModel.isLike = true;
        }
      });

      api.isWorkoutAdd(viewModel.workout.uid).then(data => {
        if (JSON.stringify(data.value) != "{}") {
          viewModel.isAddWorkout = true;
        }
      });
    },
 
    navigateBack: (args) => {
      viewModel.page.frame.goBack();
    },

    like:(args) => {
      if(viewModel.isLike){
        viewModel.likeCount--;
        viewModel.isLike = false;
      }else{
        viewModel.likeCount++;
        viewModel.isLike = true;
      }
      api.likeWorkout(viewModel.workout.uid).then(data => {
        console.log(data);
        if(typeof data.addFavorite != "undefined"){
          if(data.addFavorite == true)
            viewModel.isLike = true;
          else 
          viewModel.isLike = false;
        } 
        if(typeof data.likeCount != "undefined")
           viewModel.likeCount =  data.likeCount;
        })
    },

    addRemoveWorkout:(args)=>{
      if(viewModel.isAddWorkout){
        viewModel.isAddWorkout = false;
      }else{
        viewModel.isAddWorkout = true;
        viewModel.page.getElementsByClassName('pp-qw')[0].classList.add("pp-qw-active");
      }
     api.addRemoveWorkout(viewModel.workout.uid).then(data => {
       if(data == -1){
        viewModel.isAddWorkout = false;

       }else {
        viewModel.isAddWorkout = true;
       }
     });
    },

    qustionPopupBtnFirstTap: (args) => {
        api.navigateToSchedule(viewModel);
        viewModel.page.getElementsByClassName('pp-qw')[0].classList.remove("pp-qw-active");
    },




    qustionPopupBtnSecondTap: (args) => {

      viewModel.page.getElementsByClassName('pp-qw')[0].animate({
        opacity: 0,
        translate: {x:0, y: 1000},
        curve: enums.AnimationCurve.easeInOut
      }).then(res => {
        viewModel.page.getElementsByClassName('pp-qw')[0].classList.remove("pp-qw-active");
      })
    },



    updateData: function () {
      if (typeof viewModel.userModel.userWorkouts != "undefined" && typeof viewModel.userModel.data != "undefined") {
        appSettings.setString("userModel", JSON.stringify(viewModel.userModel));
      }
    },

    userDataListener: function (data) {
      if (data.value != null) {
        viewModel.userModel = {
          data: data.value
        };
      }
      var temp = [];
      var i = 0;
      for (var key in data.value.workouts) {
        api.getWorkout(data.value.workouts[key].idWorkout).then(workoutData => {
          if (workoutData.value != null) {
            workoutData.value.key = workoutData.key;
            if(typeof workoutData.value.posters != "undefined" && typeof workoutData.value.posters[0] != "undefined"){
              workoutData.value.poster = "https://firebasestorage.googleapis.com/v0/b/vifit-1e403.appspot.com/o/" +  workoutData.value.posters[0].replace("/","%2F").replace("/","%2F") + "?alt=media";
            }
            temp.push(workoutData.value);
          }
          if (i == Object.keys(data.value.workouts).length - 1) {
            viewModel.userModel.userWorkouts = temp;
            viewModel.updateData();
          }
          i++;
        }).catch(error => {
          console.log(error);
        })
      }
    },

    

    //Загрузка данных для тернировок пользователя
    loadData: function () {
      var userModel = appSettings.getString("userModel");
      if (typeof userModel != "undefined") {
        viewModel.userModel = JSON.parse(userModel);
      }
      setTimeout(function () {
        viewModel.updateData();
      }, 1);
      if (viewModel.listenerOn == false) {
        firebase.addValueEventListener(viewModel.userDataListener, "/users/" + appSettings.getString("useruid")).then(
          function (listenerWrapper) {
            viewModel.listenerOn = true;
          }
        );
      }
    }
  });
  return viewModel;
}
module.exports = HomeViewModel;

