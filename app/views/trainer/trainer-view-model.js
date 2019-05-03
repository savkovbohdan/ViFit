Object.defineProperty(exports, "__esModule", { value: true });
var api = require("../../js/api-firebase-module");
var observableModule = require("tns-core-modules/data/observable");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var enums = require("tns-core-modules/ui/enums");
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
var platform = require("tns-core-modules/platform");


//коефециенты для карусели
var k = [0.9, 0.8, 0.7];
var tr = [18, 35, 25];


var platform = require("platform");
require("nativescript-dom");
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    listenerOn: false,
    tabsName: ["Тренировки", "Магазин", "Статистика", "Награды"],
    indexCard:0,
    onSelectedIndex: function (args) {
      viewModel.setTabText(args);
    },

    tabLoaded: function (args) {
      // viewModel.loadData();
      setTimeout(() => {
        viewModel.setTabText(args);
      }, 1);
    },
    setTabText: function (args) {
      viewModel.page.runAgainstClasses('tab', function (elem) {
        if (elem.classList.contains('active-tab')) {
          elem.classList.remove('active-tab');
          str = elem.title;
          console.log("text tab: " + str.substr(-20, 1));

          elem.title = str.substr(-20, 1);
        }
      });
      el = viewModel.page.getElementsByClassName('tab')[args.object.selectedIndex];
      el.classList.add('active-tab');
      el.title += '\n' + viewModel.tabsName[args.object.selectedIndex];
    },
    userWorkouts: [],
    userModel:[],
    onCardLoaded: function () {
      var i = 0;
      var listClass = viewModel.page.getElementsByClassName("card-item").reverse();

     

      for (var el in listClass) {
        elem = listClass[el];
        if (i == 0) {
          elem.classList.add('card-first');
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

    
    onTextChange: function(){
      screen = platform.screen;
      scale = screen.mainScreen.scale;
      var el = viewModel.page.getElementsByClassName('workout-min')[0];
      width = el.getMeasuredWidth() / scale;
      el.animate({
        translate: { x: width, y: 0 },
        duration: 150,
        opacity:0,
        curve: enums.AnimationCurve.easeOut
      }).then(() => {
        el.animate({
          translate: { x: 0, y: 0 },
          duration: 300,
          opacity:1,
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

      console.log(cardFirts);

      var w1 = cardFirts.getMeasuredWidth() / platform.screen.mainScreen.scale;
      if (isNaN(args.view.bindingContext.prevDeltaX)) {
        args.view.bindingContext.prevDeltaX = 0;
      }



      var delta = (args.deltaX < args.view.bindingContext.prevDeltaX) ? -1 : 1;
      // args.object.translateX += args.deltaX - args.view.bindingContext.prevDeltaX;
      //  args.view.bindingContext.prevDeltaX = args.deltaX;  
      if (args.state == 3) {
        if (args.deltaX < 0) {
          if (typeof second !== "undefined") {
            if (typeof cardFirts !== "undefined")
              cardFirts.animate({
                translate: { x: -w1, y: 0 },
                opacity: 0,
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              }).then();

            if (typeof second !== "undefined")
              second.animate({
                translate: { x: 0, y: 0 },
                scale: { x: 1, y: 1 },
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              });

            if (typeof triple !== "undefined")
              triple.animate({
                translate: { x: tr[0], y: 0 },
                scale: { x: k[0], y: k[0] },
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              });


            if (typeof other[1] !== "undefined")
              other[1].animate({
                translate: { x:  tr[1], y: 0 },
                scale: { x: k[1], y: k[1] },
                opacity: 1,
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              });
          }
        } else {
          if (typeof hidden[0] !== "undefined") {
            if (typeof hidden[0] !== "undefined")
              hidden[0].animate({
                translate: { x: 0, y: 0 },
                scale: { x: 1, y: 1 },
                opacity: 1,
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              });

            if (typeof cardFirts !== "undefined")
              cardFirts.animate({
                translate: { x:  tr[0], y: 0 },
                scale: { x: k[0], y: k[0] },
                opacity: 1,
                duration: 300,
                curve: enums.AnimationCurve.easeInOut
              }).then();

            if (typeof second !== "undefined")
              second.animate({
                translate: { x:  tr[1], y: 0 },
                scale: { x:k[1], y: k[1] },
                duration: 300,
                opacity: 1,
                curve: enums.AnimationCurve.easeInOut
              });

            if (typeof triple !== "undefined")
              triple.animate({
                translate: { x:  tr[2], y: 0 },
                scale: { x: k[2], y: k[2] },
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
           viewModel.onTextChange();
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
            viewModel.onTextChange();
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
      //  console.log(page.getElementsByClassName('card-first')[0].bindingContext);
      }
    },
    userDataListener: function (data) {
      if(data.value!=null)
        viewModel.userModel = data.value;
      console.log("listennedEvent");
      var temp = [];
      var i = 0;
      for (var key in data.value.workouts) {
        // console.log(data.value.workouts);
        api.getWorkout(data.value.workouts[key].idWorkout).then(workoutData => {
          if (workoutData.value != null)
            temp.push(workoutData.value);
          if (i == Object.keys(data.value.workouts).length - 1) {
            var j = 0;
            console.log(1);
            for (var k in temp) {
              var f = (k) => {
                firebase.storage.getDownloadUrl({
                  remoteFullPath: temp[k].posters[0]
                }).then(
                  function (url) {
                    console.log(2);
                    temp[k].poster = url;
                    if (j == (Object.keys(temp).length - 1)) {
                      viewModel.userWorkouts = temp;
                      appSettings.setString("userWorkouts", JSON.stringify(temp));
                      viewModel.onCardLoaded();
                      viewModel.indexCard = 0;
                    }
                    j++;
                  }
                ).catch(error => {
                  if (j == Object.keys(temp).length - 1) {
                    viewModel.userWorkouts = temp;
                    appSettings.setString("userWorkouts", JSON.stringify(temp));
                    viewModel.onCardLoaded();
                    viewModel.indexCard = 0;
                  }
                  j++;
                });
              }
              f(k);
            }
          }

          i++;
        }).catch(error => {
          console.log(error);

        })
      }
    },

    //Загрузка данных для тернировок пользователя
    loadData: function () {
      var tempUserWorkouts = appSettings.getString("userWorkouts");
      if (typeof tempUserWorkouts != "undefined") {
        viewModel.userWorkouts = JSON.parse(tempUserWorkouts);

      }
      setTimeout(() => {
        viewModel.onCardLoaded();
        viewModel.indexCard = 0;
      }, 10);
      
      if (viewModel.listenerOn == false) {
        firebase.addValueEventListener(viewModel.userDataListener, "/users/" + appSettings.getString("useruid")).then(
          function (listenerWrapper) {
            viewModel.listenerOn = true;
            var path = listenerWrapper.path;
            var listeners = listenerWrapper.listeners;
          }
        );
      }

      console.log(["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(2010, 0, 1).getDay()]);
      
      /* api.getUserData().then(data => {
       
       }).catch(error =>  {
         console.log(error);
       });*/

      /*
            var d1 = new Date;
            var tempArray = []; 
            api.getUserPrograms().then(querySnapshot => {
              querySnapshot.forEach(userProgramId => {
                console.log("Time 1:" + (new Date - d1));
                dataProgramds = userProgramId.data();
                if(typeof dataProgramds.idWorkouts != "undefined"){
                  api.getWorkout(dataProgramds.idWorkouts).then(workout => {
                    if (workout.exists) {
                      console.log("Time 2:" + (new Date - d1));
                      dataWorkout = workout.data();
                      var postersUrls = [];
                      tempArray.push(dataWorkout);
                      viewModel.userWorkouts = tempArray;
      /*
                       if(typeof dataWorkout.postersId  != "undefined"){
                          for(url in dataWorkout.postersId){
                            api.getFile(dataWorkout.postersId[url]).then(file => {
                              if (file.exists) {
                                postersUrls.push(file.data().url);
                                dataWorkout.posters = postersUrls;
                                tempArray.push(dataWorkout);
                                viewModel.userWorkouts = tempArray;
                               // api.setUserData({temp:tempArray});
                               console.log("Time 3:" + (new Date - d1));
                              //  console.log( dataWorkout);
                              }
                            }).catch(error => console.log(error));
                          }
                      }
      
                    }
                  }).catch(error => console.log(error));
                }
               // console.log(`${doc.id} => ${JSON.stringify(doc.get())}`);
              });
            }).catch(error => console.log(error));
          */
    }
  });
  viewModel.set("hBgheader", (platform.screen.mainScreen.heightDIPs * 0.40));
  return viewModel;
}
module.exports = HomeViewModel;

