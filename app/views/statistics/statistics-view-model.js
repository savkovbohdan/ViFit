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

    listenerOn: false,
    listenerPlay: true,
    statisticsBtnList:[
      {btnText:"Вес", type: "weight", active: true },
      {btnText:"Активность",  type:"workout",  active: false}
    ],




    sourceItems:[],
/*
    sourceItems:  [
      { Country: new Date(2017, 1, 11).getTime(), Amount: 95, SecondVal: 14, ThirdVal: 24 },
      { Country: new Date(2017, 2, 1).getTime(), Amount: 93, SecondVal: 23, ThirdVal: 25 },
      { Country: new Date(2017, 2, 6).getTime(), Amount: 96, SecondVal: 23, ThirdVal: 25 },
      { Country: new Date(2017, 2, 11).getTime(), Amount: 95, SecondVal: 23, ThirdVal: 25 },
      { Country: new Date(2017, 2, 26).getTime(), Amount: 95, SecondVal: 23, ThirdVal: 25 },
      { Country: new Date(2017, 3, 1).getTime(), Amount: 87, SecondVal: 17, ThirdVal: 23 },
      { Country: new Date(2017, 3, 3).getTime(), Amount: 91, SecondVal: 17, ThirdVal: 23 },
      { Country: new Date(2017, 4, 11).getTime(), Amount: 89, SecondVal: 19, ThirdVal: 24 },
      { Country: new Date(2017, 5, 11).getTime(), Amount: 95, SecondVal: 14, ThirdVal: 24 },
      { Country: new Date(2017, 6, 11).getTime(), Amount: 88, SecondVal: 23, ThirdVal: 25 },
      { Country: new Date(2017, 8, 11).getTime(), Amount: 92, SecondVal: 17, ThirdVal: 23 },
      { Country: new Date(2017, 10, 11).getTime(), Amount: 90, SecondVal: 19, ThirdVal: 24 },
      { Country: new Date(2018, 1, 11).getTime(), Amount: 96, SecondVal: 14, ThirdVal: 24 },
      { Country: new Date(2018, 3, 11).getTime(), Amount: 87, SecondVal: 23, ThirdVal: 25 },
      { Country: new Date(2018, 4, 11).getTime(), Amount: 95, SecondVal: 17, ThirdVal: 23 },
      { Country: new Date(2018, 5, 11).getTime(), Amount: 91, SecondVal: 19, ThirdVal: 24 },
      { Country: new Date(2018, 8, 11).getTime(), Amount: 96, SecondVal: 14, ThirdVal: 24 },
      { Country: new Date(2018, 10, 11).getTime(), Amount: 93, SecondVal: 23, ThirdVal: 25 },
      { Country: new Date(2018, 11, 11).getTime(), Amount: 100, SecondVal: 17, ThirdVal: 23 }
    ],*/
    run:  () => {
    api.screenSettings();
    viewModel.loadData();
    },

    loadChart: function(){


      getWeek = function(date) {
        var onejan = new Date(date.getFullYear(),0,1);
        var today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
        var dayOfYear = ((today - onejan + 86400000)/86400000);
        return Math.ceil(dayOfYear/7)
      };
   //   console.log(viewModel.userModel.data);
    //   viewModel.sourceItems =  viewModel.userModel.data.statistics[type];
    var activeBtn =  viewModel.page.getElementsByClassName("statistics-active-btn")[0];
    if( typeof activeBtn != "undefined"){
   
       temp = [];
        var type =  activeBtn.bindingContext.type;
        if(typeof viewModel.userModel.data.statistics != "undefined" && typeof viewModel.userModel.data.statistics[type] != "undefined"){
          for(key in viewModel.userModel.data.statistics[type]){
            data = viewModel.userModel.data.statistics[type][key];
            data.dateString =  new Date(data.userDate).toISOString().split("T")[0].replace(/-/g,'.');;
            temp.push(data);
          }


          temp.sort(function(a, b) {
            return a.userDate - b.userDate;
          });


          weekActivityKeyStart = -1;
          weekActivityCount = 1;
          tempWeek = [];
          
         
          if(type == "workout"){
         
            for(key=1; key < temp.length; key++){
        
             /* console.log("Неделя один " +  getWeek((new Date(temp[key-1].userDate))));
              console.log("Неделя два " +  getWeek((new Date(temp[key].userDate))));

              console.log(temp[key].dateString);*/

              if((new Date(temp[key].userDate)).getYear() == (new Date(temp[key-1].userDate)).getYear() &&
              (new Date(temp[key].userDate)).getMonth() == (new Date(temp[key-1].userDate)).getMonth()  &&
              (getWeek(new Date(temp[key].userDate))) == getWeek((new Date(temp[key-1].userDate)))){
                weekActivityCount++;
                if(weekActivityKeyStart == -1)
                  weekActivityKeyStart = key-1;
              }else {
                if(weekActivityKeyStart == -1)
                  weekActivityKeyStart = key;
                weekData = {
                  data:weekActivityCount,
                  dateString: temp[weekActivityKeyStart].dateString.substr(5) + ' - ' + temp[key].dateString.substr(5)
                }
                tempWeek.push(weekData);
                weekActivityCount=1;
                weekActivityKeyStart = -1;
              }


              if ( temp.length-1 == key && weekActivityKeyStart != -1) {
                if(weekActivityKeyStart == -1)
                  weekActivityKeyStart = key;
                weekData = {
                  data:weekActivityCount,
                  dateString: temp[weekActivityKeyStart].dateString.substr(5) + ' - ' + temp[key].dateString.substr(5)
                }
                tempWeek.push(weekData);
                weekActivityCount=0;
                weekActivityKeyStart = -1;
              }


            }

            viewModel.sourceItems = tempWeek;

          }else {
            viewModel.sourceItems = temp;
          }


         
        }
    }

    },
   
    updateData: function () {
      if (typeof viewModel.userModel.userWorkouts != "undefined" && typeof viewModel.userModel.data != "undefined") {
        viewModel.loadChart();
     
        appSettings.setString("userModel", JSON.stringify(viewModel.userModel));
      }
    },

    userDataListener: function (data) {
      if(viewModel.listenerPlay){
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
    }
    },

    
    
    //Загрузка данных для тернировок пользователя
    loadData: function () {
      var userModel = appSettings.getString("userModel");
      if (typeof userModel != "undefined") {
        viewModel.userModel = JSON.parse(userModel);

       
      }
      setTimeout(function () {
        viewModel.loadChart();
        viewModel.updateData();
      }, 1);
      if (viewModel.listenerOn == false) {
        firebase.addValueEventListener(viewModel.userDataListener, "/users/" + appSettings.getString("useruid")).then(
          function (listenerWrapper) {
            viewModel.listenerOn = true;
            var listeners = listenerWrapper.listeners; 
          
          }
        );
      }
    },

    statisticsTap:(args)=> {
      var activeBtn =  viewModel.page.getElementsByClassName("statistics-active-btn")[0];
      if( typeof activeBtn != "undefined"){
        activeBtn.classList.remove("statistics-active-btn");
      }
      args.object.classList.add("statistics-active-btn");
      viewModel.loadChart();
    }


  });
  return viewModel;
}
module.exports = HomeViewModel;





