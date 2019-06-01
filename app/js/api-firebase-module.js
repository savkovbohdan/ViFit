Object.defineProperty(exports, "__esModule", { value: true });
firebaseN = require("nativescript-plugin-firebase");
var frame = require("tns-core-modules/ui/frame");
const appSettings = require("application-settings");
const application = require("tns-core-modules/application");
var platform = require("tns-core-modules/platform");
var firebase = require("nativescript-plugin-firebase");
var gF = require("../js/api-firebase-module");



/* Database */
var getUserData = () => {
  return firebase.getValue('/users/' + appSettings.getString("useruid"));
}

module.exports.getUserData = getUserData;
setUserData = (data) => {
  return firebase.update(
    '/users/' + appSettings.getString("useruid"),
    data
  )
}

module.exports.setUserData = setUserData;

module.exports.updateUserDataUrl = (url, data) => {
  return firebase.update(
    '/users/' + appSettings.getString("useruid") + '/' + url,
    data
  )
}

module.exports.setUserDataUrl = (url, data) => {
  return firebase.update(
    '/users/' + appSettings.getString("useruid") + '/' + url,
    data
  )
}





module.exports.getUserWorkouts = () => {
  return firebase.getValue('/users/' + appSettings.getString("useruid") + "/workouts");
}

module.exports.getWorkout = (id) => {
  return firebase.getValue('/workouts/' + id);
}

module.exports.removeUserData = (url) => {
  return firebase.remove('/users/' + appSettings.getString("useruid") + "/" + url);
}

module.exports.pushUserData = (url, data) => {
  return firebase.push('/users/' + appSettings.getString("useruid") + "/" + url, data);
}

module.exports.pushStatistics = (data, type) => {
  return firebase.push('/users/' + appSettings.getString("useruid") + "/statistics/" + type,
    {
      date: firebase.ServerValue.TIMESTAMP,
      data: data,
      userDate: (new Date).getTime()
    });
}

module.exports.getStatistics = (type) => {
  return firebase.getValue('/users/' + appSettings.getString("useruid") + "/statistics/" + type);
}

module.exports.updatePowerPoints = (newPoints) => {
  if (Number.isInteger(parseInt(newPoints))) {
    console.log(1);
    return firebase.update(
      '/users/' + appSettings.getString("useruid") + "/powerPoints",
      parseInt(newPoints)
    )
  }
}



module.exports.isFavorite = (uid) => {
  var onQueryEvent = function (result) {

  };
  return firebase.query(
    onQueryEvent,
    '/users/' + appSettings.getString("useruid") + "/favorites",
    {
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: 'uid' // mandatory when type is 'child'
      },
      range: {
        type: firebase.QueryRangeType.EQUAL_TO,
        value: uid
      },
      limit: {
        type: firebase.QueryLimitType.LAST,
        value: 1
      }
    }
  ).then(data => {

    return data;
  })
}


module.exports.likeWorkout = (uid) => {
  return module.exports.isFavorite(uid).then(favorite => {
    if (JSON.stringify(favorite.value) == "{}") {
      return firebase.transaction('/workouts/' + uid + "/likeCount", (currentValue => {
        if (currentValue === null) {
          return 1;
        } else {
          return ++currentValue; // Increment the current value. Do not try to increment currentValue if its NaN!
        }
      }))
        .then((result) => {
          if (result.committed == true) {
            var data = {
              uid: uid
            }
            module.exports.pushUserData("favorites", data);
          }
         var  r = {
            likeCount: result.snapshot.val(),
            addFavorite: true,
          }

          return r;
        }).catch(err => console.log("Encountered an error " + err));
    } else {
     return firebase.transaction('/workouts/' + uid + "/likeCount", (currentValue => {
        if (currentValue === null || currentValue === 1) {
          return 0;
        } else {
          return --currentValue; // Increment the current value. Do not try to increment currentValue if its NaN!
        }
      }))
        .then((result) => {
          if (result.committed == true) {
            if ((Object.keys(favorite.value)[0]) != "")
              module.exports.removeUserData("favorites/" + Object.keys(favorite.value)[0]);
          }
          var r = {
            likeCount: result.snapshot.val(),
            addFavorite: false,
          }
          return r;
        }).catch(err => console.log("Encountered an error " + err));
    }
  });
}



//Добавление трени

module.exports.isWorkoutAdd = (uid) => {
  var onQueryEvent = function (result) {
  };
  return firebase.query(
    onQueryEvent,
    '/users/' + appSettings.getString("useruid") + "/workouts",
    {
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: 'idWorkout' // mandatory when type is 'child'
      },
      range: {
        type: firebase.QueryRangeType.EQUAL_TO,
        value: uid
      },
      limit: {
        type: firebase.QueryLimitType.LAST,
        value: 1
      }
    }
  ).then(data => {
    return data;
  })
}



module.exports.addRemoveWorkout = (uid) => {
  return module.exports.isWorkoutAdd(uid).then(workout => {
    if (JSON.stringify(workout.value) == "{}") {
        var data = {
          idWorkout: uid
        }
        return module.exports.pushUserData("workouts", data);
    
    } else {
          if ((Object.keys(workout.value)[0]) != "")
            module.exports.removeUserData("workouts/" + Object.keys(workout.value)[0]);
        return -1;
    }
  });
}





/**
 * Функция для перевода ссылок в нормальное состояние
 * @param  {} item
 */
var replaceUrlItem = (item) => {
  if (typeof item.posters != "undefined") {
    item.poster = "https://firebasestorage.googleapis.com/v0/b/vifit-1e403.appspot.com/o/" + item.posters[0].replace("/", "%2F").replace("/", "%2F") + "?alt=media";
    for (key in item.posters)
      item.posters[key] = "https://firebasestorage.googleapis.com/v0/b/vifit-1e403.appspot.com/o/" + item.posters[key].replace("/", "%2F").replace("/", "%2F") + "?alt=media";
  }
  return item;
}
module.exports.replaceUrlItem = replaceUrlItem;

/**
 * Функция для преобразования тегов
 * @param  {} item
 */
var replaceTagItem = (item) => {
  if (typeof item.tags != "undefined") {
    var tags = [];
    for (var key in item.tags) {
      data = {
        name: item.tags[key].name
      }
      tags.push(data);
    }
    item.tags = tags;
  }
  return item;
}
module.exports.replaceTagItem = replaceTagItem;

module.exports.workoutsByLevel = (sportLevel, workouts) => {
  return workouts.filter(value => 
     value.level == sportLevel
  );
}


module.exports.wokoutsByLike = (workouts) => {
  return workouts.sort(function (a, b) {
    return (a.likeCount > b.likeCount ? -1 : (a.likeCount < b.likeCount ? 1 : 0));
  });
}


module.exports.getAllWokouts = () => {
  return firebase.getValue('/workouts').then((result) => {

    if (typeof result.value != "undefined") {
      var arr = [];
      for (var key in result.value) {
        result.value[key].uid = key;
        arr.push(replaceTagItem(replaceUrlItem(result.value[key])));
      }
      return arr;
    }
  }).catch((error) => {
    console.log(error);
    console.log("Error");
  });
}

/* Database end */
quizComplate = (data) => {
  setUserData(data)
    .then(doc => {
      frame.topmost().navigate({
        moduleName: "views/trainer/trainer-page",
        animated: false
      });
      appSettings.setBoolean("quizIsComplate", true);
    })
    .catch(error => console.log("Error: " + error));
}

module.exports.quizComplate = quizComplate;
var quizIsComplate = () => {
  getUserData().then(data => {
    if (data.value != null && data.value.quizIsComplate == true) {
      appSettings.setBoolean("quizIsComplate", true);
      frame.topmost().navigate({
        moduleName: "views/trainer/trainer-page",
        animated: false
      });
    }
  });
}

module.exports.quizIsComplate = quizIsComplate;
var Login = () => {
  firebase.getAuthToken({
    forceRefresh: false
  }).then(
    function (result) {
      // appSettings.setString("token", result.token);
    },
    function (errorMessage) {
      console.log("Auth result retrieval error: " + errorMessage);
    }
  );
  getUserData().then(data => {
    if (data.value != null && data.value.quizIsComplate == 1) {
      appSettings.setBoolean("quizIsComplate", true);
      frame.topmost().navigate({
        moduleName: "views/trainer/trainer-page",
        animated: false
      });
    } else {
      frame.topmost().navigate({
        moduleName: "views/quiz/quiz-page",
        animated: false
      });
    }
  })
    .catch(error => console.log("Error: " + error));
}
module.exports.Login = Login;


var Logout = () => {
  appSettings.clear();
  firebase.logout()
    .then(() => console.log("Logout OK"))
    .catch(error => console.log("Logout error: " + JSON.stringify(error)));
  frame.topmost().navigate({
    moduleName: "views/auth/auth-page",
    animated: false
  });
}

module.exports.Logout = Logout;
module.exports.navigateToSchedule = (model) => {
  frame.getFrameById("mainFrame").navigate({
    context: { model: model },
    moduleName: "views/schedule/schedule-page",
    animated: false
  });
}

module.exports.navigateToExercises = (model, data) => {
  frame.getFrameById("mainFrame").navigate({
    context: { model: model, data: data },
    moduleName: "views/exercises/exercises-page",
    animated: false
  });
}



module.exports.navigateToWorkout = (data) => {
  frame.getFrameById("mainFrame").navigate({
    context: { data: data },
    moduleName: "views/workout/workout-page",
    animated: false
  });
}




module.exports.navigateToExercise = (exercises, userData) => {
  frame.topmost().navigate({
    context: { exercises: exercises, userData: userData },
    moduleName: "views/exercise/exercise-page",
    animated: false
  });
}



module.exports.screenSettings = () => {
  if (application.android && platform.device.sdkVersion >= '21') {
    //  var View = android.view.View;
    var window = application.android.startActivity.getWindow();
    // set the status bar to Color.Transparent

    //   window.setStatusBarColor(0x000000);
    /*
            var decorView = window.getDecorView();
            decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);*/
    window.addFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
  }
}