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
    state: 0,
    first:true,
    scheduleWorkouts: new ObservableArray(),
    templateSelectorFunction: function (item, index, items) {
      if (typeof item.type == "undefined")
        return "default";
      return item.type;
    },
    scheduleLoad: function () {

      //var tempShedule = [];      
      if(viewModel.first){
      
        viewModel.load(viewModel.mainContext.userModel.data);
        viewModel.first = false;
      }else{
     
        api.getUserData().then((data) => {
         
          viewModel.load(data);
          
        }).catch((error) => {
        });
      }
    },

  load:function(data){
    var scheduleWorkouts = [];
    viewModel.scheduleWorkouts = new ObservableArray();
    if(typeof data.scheduleWorkouts != "undefined"){
      data.value = data;
    }
    if (typeof data.value != "undefined" && typeof data.value.scheduleWorkouts != "undefined") {
      scheduleWorkouts = data.value.scheduleWorkouts;
    }

    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var i = 0;
    for (day in days) {
      var item = {
        type: (i % 2 == 0) ? "white-day" : "gray-day",
        name: days[day],
        data: []
      }
      if (typeof scheduleWorkouts[days[day]] != "undefined") {
        var tasks = scheduleWorkouts[days[day]];
        for (task in tasks) {
          if (typeof tasks[task].idWorkout != "undefined") {
            workoutTemp = [...viewModel.mainContext.userModel.userWorkouts];
            index = workoutTemp.findIndex(x => x.key == tasks[task].idWorkout);
            if (index != -1) {
              data = workoutTemp[index];
              item.data.push(data);
            }
          } else {
            if (tasks[task].type == "weight") {
              data = {
                name: "Замер веса",
              }
              item.data.push(data);
            }
          }
        }
      }
      viewModel.scheduleWorkouts.push(item);
      i++;
    }
  },
    chek:function(args){
    
      el = args.object.getElementsByClassName('chek-box')[0];
      el2 = args.object.getElementsByClassName('btn-select')[0];
     if(el.classList.contains("chek-box-chek")){
      el.classList.remove("chek-box-chek");
      el2.classList.remove("active-btn");
     }else {
      el.classList.add("chek-box-chek");
      el2.classList.add("active-btn");
     }
    },
    save: function(args){
      var buttonBig =  viewModel.page.getElementsByClassName("button-big")[0];
      var radlist =  viewModel.page.getElementsByClassName("main-rad")[0];
      //buttonBig
      
      viewModel.page.runAgainstClasses('list-task', function(elem) {  
        //elem
        nameDay = elem.bindingContext.name;
        taskInDay = [];
        flag = true
        elem.runAgainstClasses('chek-box', function(elemChild) { 
          if(flag){
           api.removeUserData("scheduleWorkouts/" + nameDay);
            flag = false;
          }
          if(elemChild.classList.contains("chek-box-chek")){
          if(typeof elemChild.info.key != "undefined"){
            api.pushUserData("scheduleWorkouts/" + nameDay, {idWorkout:elemChild.info.key});
          }
          if(typeof elemChild.info.type != "undefined"){
            if (elemChild.info.type == "weight")
              api.pushUserData("scheduleWorkouts/" + nameDay, {type:elemChild.info.type});
          }
        }
        
        });
    });

    
    animations.animate(buttonBig, 400, 0, "h");


    setTimeout(function(){
      viewModel.scheduleLoad();
      buttonBig.height = 0;
    }, 400)
    },
    editScheldue: function (args) {
    var buttonBig =  viewModel.page.getElementsByClassName("button-big")[0];
    //buttonBig
    animations.animate(buttonBig, 500, 70, "h");
      remove = function (el, value) {
        var idx = el.indexOf(value);
        if (idx != -1) {
          // Второй параметр - число элементов, которые необходимо удалить
          return el.splice(idx, 1);
        }
        return false;
      }
      day = args.object.bindingContext.name;
      el = args.object.parent.parent.getElementsByClassName('list')[0];
      scheduleWorkouts = [];
      dayData = [];
      userWorkout = [];
      workoutTemp = [];
      allWorkouts = [];
      api.getUserData().then((data) => {
        el.removeChildren();
        if (typeof data.value != "undefined" && typeof data.value.scheduleWorkouts != "undefined") {
          scheduleWorkouts = data.value.scheduleWorkouts;
        }
        if (typeof scheduleWorkouts[day] != "undefined") {
          tasks = scheduleWorkouts[day];
          for (task in tasks) {
            if (typeof tasks[task].idWorkout != "undefined") {
              workoutTemp = [...viewModel.mainContext.userModel.userWorkouts];
              index = workoutTemp.findIndex(x => x.key == tasks[task].idWorkout);
              if (index != -1) {
                data = workoutTemp[index];
                data.isDay = true;
                dayData.push(data);
              }
            } else {
              if (tasks[task].type == "weight") {
                data = {
                  isDay: true,
                  type: "weight",
                  name: "Замер веса",
                }
                dayData.push(data);

              }
            }
          }
        }
        userWorkout = [...viewModel.mainContext.userModel.userWorkouts];
        userWorkout.push({ type: "weight" });
        userWorkoutTemp = [...userWorkout];
        for (workout in userWorkout) {
          find = -1;
          find2 = -1;
          if (typeof userWorkout[workout].key != "undefined") {
            find = dayData.findIndex(x => typeof x.key != "undefined" && x.key === userWorkout[workout].key);
          }else{
          if (typeof userWorkout[workout].type != "undefined") {
            find2 = dayData.findIndex(x => typeof x.type != "undefined" && x.type === userWorkout[workout].type);

          }
        }
          if (find != -1 || find2 != -1) {
            remove(userWorkoutTemp, userWorkout[workout]);
          }
        }
        for (workout in userWorkoutTemp) {
          userWorkoutTemp[workout].isDay = false;
        }
        allWorkouts = [...dayData.concat(userWorkoutTemp)];
        for (workouts in allWorkouts) {
          var stack = new StackLayout();
          stack.orientation = "horizontal";
          var btn = new Label();
          stack.opacity = 0;
          btn.paddingTop = "10";
          var chekBox = new Label();
          btn.classList.add("btn-select");
          if (typeof allWorkouts[workouts].name != "undefined") {
            btn.text = allWorkouts[workouts].name;
          }
          else {
            if (typeof allWorkouts[workouts].type != "undefined") {
              if (allWorkouts[workouts].type == "weight") {
                btn.text = "Замер веса";
              }
            }
          }
          chekBox.text = ""
          chekBox.className = "chek-box"
          if (allWorkouts[workouts].isDay == true) {
            chekBox.classList.add("chek-box-chek");
            btn.classList.add("active-btn");

          }
       
          chekBox.info = allWorkouts[workouts];
          stack.addChild(chekBox);
          stack.addChild(btn); 
          stack.on("tap", viewModel.chek);
          el.addChild(stack);
          stack.animate({
            opacity:1,
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
        }
      }).catch((error) => {
      });
    },
    run: function () {
      viewModel.scheduleLoad();

    },
    navigateBack: function(args){
      viewModel.page.frame.goBack();
    }
  });
  return viewModel;
}
module.exports = HomeViewModel;

