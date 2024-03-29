Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = require("../../js/api-firebase-module");
var gF = require("../../js/global-functions");
var observableModule = require("tns-core-modules/data/observable");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var enums = require("tns-core-modules/ui/enums");
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
var firebaseW = require("nativescript-plugin-firebase/app");
var platform = require("tns-core-modules/platform");
const Label = require("tns-core-modules/ui/label").Label;
//коефециенты для карусели
var k = [0.9, 0.8, 0.7];
var tr = [18, 35, 25];
var platform = require("platform");
require("nativescript-dom");
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    listenerOn: false,
    tabsName: ["Тренировки", "Магазин", "Статистика", "Награды"],
    indexCard: 0,
    cardName: "name",
    complateDateCount: 0,
    daysCount:0,
    userWorkouts: {},
    userModel: {},
    scheduleWorkouts: new ObservableArray(),
    onSelectedIndex: function (args) {
      viewModel.setTabText(args);
    },
    onCardLoaded: function () {
      var i = 0;
      var listClass = viewModel.page.getElementsByClassName("card-item").reverse();
      for (var el in listClass) {
        elem = listClass[el];
        if (i == 0) {
          elem.classList.add('card-first');
          viewModel.cardName = elem.bindingContext.name;
          viewModel.complateDateCount = elem.bindingContext.complateDateCount;
          viewModel.daysCount = elem.bindingContext.daysCount;
        }
        if (i == 1) {
          elem.classList.add('card-second');
          elem.scaleX = elem.scaleY = k[0];
          elem.translateX = tr[0];
        }
        if (i == 2) {
          elem.scaleX = elem.scaleY = k[1];
          elem.translateX = tr[1];
          elem.classList.add('card-other');
        }
        if (i > 2) {
          elem.scaleX = elem.scaleY = k[2];
          elem.translateX = tr[1];
          elem.opacity = 0;
          elem.classList.add('card-other');
        }
        i++;
      }
    },


    onTextChange: function () {
      screen = platform.screen;
      scale = screen.mainScreen.scale;
      var el = viewModel.page.getElementsByClassName('workout-min')[0];
      if (typeof viewModel.page.getElementsByClassName("card-first")[0] != "undefined") {
        if (viewModel.cardName == viewModel.page.getElementsByClassName("card-first")[0].bindingContext.name)
          return false
        viewModel.cardName = viewModel.page.getElementsByClassName("card-first")[0].bindingContext.name;
        viewModel.complateDateCount =  viewModel.page.getElementsByClassName("card-first")[0].bindingContext.complateDateCount;
        viewModel.daysCount =  viewModel.page.getElementsByClassName("card-first")[0].bindingContext.daysCount;
      }
      if (typeof viewModel.userModel.userWorkouts == "undefined" || typeof el == "undefined")
        return false
      width = el.getMeasuredWidth() / scale;
      el.animate({
        translate: {
          x: width,
          y: 0
        },
        duration: 150,
        opacity: 0,
        curve: enums.AnimationCurve.easeOut
      }).then(() => {
        el.animate({
          translate: {
            x: 0,
            y: 0
          },
          duration: 300,
          opacity: 1,
          curve: enums.AnimationCurve.easeOut
        });
      });
    },
    onDrag: function (args) {
      page = viewModel.page;
      var cardFirts = page.getElementsByClassName('card-first')[0];
      var second = page.getElementsByClassName('card-second')[0];
      var other = page.getElementsByClassName('card-other').reverse();
      var triple = page.getElementsByClassName('card-other').reverse()[0];
      var hidden = page.getElementsByClassName('card-hidden');
      var w1 = cardFirts.getMeasuredWidth() / platform.screen.mainScreen.scale;
      if (isNaN(args.view.bindingContext.prevDeltaX)) {
        args.view.bindingContext.prevDeltaX = 0;
      }
      var delta = (args.deltaX < args.view.bindingContext.prevDeltaX) ? -1 : 1;
      
      if (args.state == 3) {
        if (args.deltaX < 0) {
          if (typeof second !== "undefined") {
            if (typeof cardFirts !== "undefined")
              cardFirts.animate({
                translate: {
                  x: -w1,
                  y: 0
                },
                opacity: 0,
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              }).then();
            if (typeof second !== "undefined")
              second.animate({
                translate: {
                  x: 0,
                  y: 0
                },
                scale: {
                  x: 1,
                  y: 1
                },
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              });
            if (typeof triple !== "undefined")
              triple.animate({
                translate: {
                  x: tr[0],
                  y: 0
                },
                scale: {
                  x: k[0],
                  y: k[0]
                },
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              });
            if (typeof other[1] !== "undefined")
              other[1].animate({
                translate: {
                  x: tr[1],
                  y: 0
                },
                scale: {
                  x: k[1],
                  y: k[1]
                },
                opacity: 1,
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              });
          }
        } else {
          if (typeof hidden[0] !== "undefined") {
            if (typeof hidden[0] !== "undefined")
              hidden[0].animate({
                translate: {
                  x: 0,
                  y: 0
                },
                scale: {
                  x: 1,
                  y: 1
                },
                opacity: 1,
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              });

            if (typeof cardFirts !== "undefined")
              cardFirts.animate({
                translate: {
                  x: tr[0],
                  y: 0
                },
                scale: {
                  x: k[0],
                  y: k[0]
                },
                opacity: 1,
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              }).then();

            if (typeof second !== "undefined")
              second.animate({
                translate: {
                  x: tr[1],
                  y: 0
                },
                scale: {
                  x: k[1],
                  y: k[1]
                },
                duration: 300,
                opacity: 1,
                curve: enums.AnimationCurve.easeInOut
              });

            if (typeof triple !== "undefined")
              triple.animate({
                translate: {
                  x: tr[2],
                  y: 0
                },
                scale: {
                  x: k[2],
                  y: k[2]
                },
                opacity: 1,
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              });
          }

        }
      }
      if (args.state == 3) {
        if (args.deltaX < 0) {
          if (typeof second !== "undefined") {
            viewModel.indexCard++;
           // console.log(viewModel.indexCard);
            if (typeof cardFirts !== "undefined") {
              cardFirts.borderRadius = 20;
              cardFirts.classList.add("card-hidden");
              cardFirts.classList.remove("card-first");
            }
            if (typeof second !== "undefined") {
              second.classList.add("card-first");
              second.classList.remove("card-second");
            }
            if (typeof triple !== "undefined") {
              triple.classList.add("card-second");
              triple.classList.remove("card-other");
            }
          }
        } else {
          if (typeof hidden[0] !== "undefined") {
            viewModel.indexCard--;
          //  console.log(viewModel.indexCard);
            if (typeof hidden[0] !== "undefined") {
              hidden[0].classList.add("card-first");
              hidden[0].classList.remove("card-hidden");
            }
            if (typeof cardFirts !== "undefined") {
              cardFirts.classList.add("card-second");
              cardFirts.classList.remove("card-first");
            }
            if (typeof second !== "undefined") {
              second.classList.add("card-other");
              second.classList.remove("card-second");
            }
          }
        }
        viewModel.onTextChange();
      }
    },
    getType: function (item) {
      return item.type;
    },
    measurementSet: function (args) {
      elText = args.object.parent.getElementsByClassName('text-view')[0];
      elButtonText = args.object.parent.getElementsByClassName('btn-text-stat')[0];
      elContainerText = args.object.parent.getElementsByClassName('line-text-view')[0];
      elRadius = args.object.parent.parent.getElementsByClassName('view-data-bg-set-radius')[0];
      elStatistic = args.object.parent.getElementsByClassName('min-statistic')[0];
      progressBar = args.object.parent.parent.getElementsByClassName('progress-bar-circlar')[0];
      tempStat = [];
      var text = Number(elText.text);
      if (text == 0 || isNaN(text))
        return false;
      var statType = args.object.bindingContext.statisticsType;
      if (typeof viewModel.userModel.data.statistics != "undefined" && typeof viewModel.userModel.data.statistics[statType] != "undefined") {
        st = viewModel.userModel.data.statistics[statType];
        st = Object.entries(st);
        st = st.sort((a, b) => {
          if (new Date(a[1].date) <= new Date(b[1].date))
            return -1;
          else 1
        });
        st = st.slice(-2);
        for (key in st) {
          var label = new Label();
          label.text = st[key][1].data + "";
          tempStat.push(st[key][1].data + "");
          elStatistic.addChild(label);
        }
      }
      var label = new Label();
      label.text = text + "";
      label.classList.add("min-stat-last");
      elStatistic.addChild(label);
      elButtonText.text = "Вся статистика";
      elRadius.animate({
        scale: {
          x: 10,
          y: 10
        },
        duration: 600,
        curve: enums.AnimationCurve.easeInOut
      })
      elContainerText.animate({
        opacity: 0,
        duration: 600,
        curve: enums.AnimationCurve.easeInOut
      }).then(() => {
        elContainerText.height = "0";
        elStatistic.height = "auto";
        elStatistic.animate({
          opacity: 1,
          duration: 600,
          curve: enums.AnimationCurve.easeInOut
        })
        api.pushStatistics(text, statType);
        powerPoints = 0
        if(typeof viewModel.userModel.data.powerPoints != "undefined")
          powerPoints =  parseInt(viewModel.userModel.data.powerPoints);
        if(typeof args.object.bindingContext.powerPoints != "undefined"){
          powerPoints += parseInt(args.object.bindingContext.powerPoints);
          api.updatePowerPoints(powerPoints);
        }
        progressBar.update(100);

      })
    },

    templateSelectorFunction: function (item, index, items) {
      if (typeof item.type == "undefined")
        return "default";
      return item.type;
    },
    
    //Генератор
    taskGenerator: function () {
      if (typeof viewModel.userModel.userWorkouts == "undefined")
        return false;
      var temp = [];
      viewModel.scheduleWorkouts = new ObservableArray();
      viewModel.scheduleWorkouts.push({
        userWorkouts: viewModel.userModel.userWorkouts,
        type: "first"
      })
      if (typeof viewModel.userModel.data.scheduleWorkouts != "undefined")
        data = viewModel.userModel.data.scheduleWorkouts;
      else data = [];
      var date = new Date();
      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      date.getDay()
      var removed = days.splice(0, date.getDay());
      days = days.concat(removed);
      for (key in days) {
        console.log(key);
        if (key == 3)
          break;
        nameDay = "error";
        if (key == 0) {
          nameDay = "Сегодня";
        } else if (key == 1) {
          nameDay = "Завтра";
        } else if (key == 2) {
          nameDay = "Послезавтра";
        } else {
          nameDay = days[key];
        }
        titleDay = {
          name: nameDay,
          type: "nameDay"
        }
        flagWorkouts = false
        if (typeof data[days[key]] != "undefined") {
          viewModel.scheduleWorkouts.push(titleDay);
          var indexFirstInDay = viewModel.scheduleWorkouts.length;
          tasks = data[days[key]];
          for (task in tasks) {
            if (typeof tasks[task].idWorkout != "undefined") {
              taskTemp = {};
              userWork = [...viewModel.userModel.userWorkouts];
              index = userWork.findIndex(x => x.key == tasks[task].idWorkout);
              if (index != -1) {
              taskTemp = userWork[index];
              taskTemp.powerPoints = "+10"
              taskTemp.type = "workout";
              uW = viewModel.userModel.data.workouts;
              var infoWorkout =  Object.assign({}, gF.getCurrentWorkout(tasks[task].idWorkout, Object.assign({}, taskTemp),  Object.assign({}, uW)));
              if(infoWorkout != null){
                if(key == 0){
                  taskTemp.progress = ((infoWorkout.countComplateExercise) / infoWorkout.countExercise * 100);
                  taskTemp.isComplate = infoWorkout.isComplate;
                }else {
                  taskTemp.progress  = 0;
                  taskTemp.isComplate = false;
                }
                taskTemp.time = infoWorkout.timeWorkout;
                taskTemp.exerciseCount = infoWorkout.countExercise;
              }
              taskTemp.isFirst = false;
                taskTemp.isLast = false;
                viewModel.scheduleWorkouts.push(Object.assign({}, taskTemp));
                flagWorkouts = true;
              }
            }
            if (tasks[task].type == "weight") {
              var isComplate = false;
              var tempDataStatistics = [];
              var progress = 0;
              if (typeof viewModel.userModel.data.statistics != "undefined" &&
                typeof viewModel.userModel.data.statistics[tasks[task].type] != "undefined" &&
                key == 0) {
                st = viewModel.userModel.data.statistics[tasks[task].type];
                st = Object.entries(st);
                st = st.sort((a, b) => {
                  if (new Date(a[1].date) <= new Date(b[1].date))
                    return -1;
                  else 1
                });
                st = st.slice(-3);
                for (keyData in st) {
                  tempDataStatistics.push({ value: st[keyData][1].data, isLast: (keyData == st.length - 1) ? true : false });
                }
                if (st[st.length - 1][1].userDate != "undefined") {
                  if (new Date(st[st.length - 1][1].userDate).toDateString() == new Date().toDateString()) {
                    isComplate = true;
                    progress = 100;
                  }
                }
                if (isComplate == false)
                  tempDataStatistics = [];
              }
              taskTemp = {
                name: "Выполнить замер веса",
                type: "measurement",
                isComplate: isComplate,
                progress: progress,
                data: tempDataStatistics,
                powerPoints: "+2",
                isFirst: false,
                isLast: false,
                statisticsType: tasks[task].type,
              }
              viewModel.scheduleWorkouts.push(taskTemp);
            }       
          }
        }
        var indexLastInDay = viewModel.scheduleWorkouts.length - 1;
        if (typeof viewModel.scheduleWorkouts.getItem(indexFirstInDay) != "undefined") {
          var t = viewModel.scheduleWorkouts.getItem(indexFirstInDay);
          t.isFirst = true;
        
          viewModel.scheduleWorkouts.setItem(indexFirstInDay, t)
        }
        if (typeof viewModel.scheduleWorkouts.getItem(indexLastInDay) != "undefined") {
          var t = viewModel.scheduleWorkouts.getItem(indexLastInDay);
          t.isLast = true;
          viewModel.scheduleWorkouts.setItem(indexLastInDay, t)
        }

      }

    },
    updateData: function () {
      if (typeof viewModel.userModel.userWorkouts != "undefined" && typeof viewModel.userModel.data != "undefined") {
        appSettings.setString("userModel", JSON.stringify(viewModel.userModel));
        viewModel.indexCard = 0;
        viewModel.taskGenerator();
        setTimeout(function () {
          viewModel.onCardLoaded();
          viewModel.onTextChange();
        }, 50);
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
        console.log(1);
        api.getWorkout(data.value.workouts[key].idWorkout).then(workoutData => {
          if (workoutData.value != null) {
            workoutData.value.key = workoutData.key;
            if(typeof workoutData.value.posters != "undefined" && typeof workoutData.value.posters[0] != "undefined"){
              workoutData.value.poster = "https://firebasestorage.googleapis.com/v0/b/vifit-1e403.appspot.com/o/" +  workoutData.value.posters[0].replace("/","%2F").replace("/","%2F") + "?alt=media";
            }

            if(typeof data.value.workouts[key].days != "undefined")
              workoutData.value.complateDateCount = Object.keys(data.value.workouts[key].days).length; 
            else 
               workoutData.value.complateDateCount = 0;
           
               if(typeof workoutData.value.days != "undefined")
                  workoutData.value.daysCount = Object.keys(workoutData.value.days).length; 
              else 
                  workoutData.value.daysCount = 0;

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
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners;
          }
        );
      }
    },
    
    //Переход в расписание
    navigateToSchedule: function(){
      api.navigateToSchedule(viewModel);
    },

    
    navigateToExercises:function (args){
      api.navigateToExercises(viewModel, args.object.bindingContext);
    }
  });
  viewModel.set("hBgheader", (platform.screen.mainScreen.heightDIPs * 0.40));
  return viewModel;
}
module.exports = HomeViewModel;
