Object.defineProperty(exports, "__esModule", { value: true });
firebaseN = require("nativescript-plugin-firebase");
var frame = require("tns-core-modules/ui/frame");
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");

/* Database */
var getUserData  = () => {
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

module.exports.getUserWorkouts  = () => {
  return firebase.getValue('/users/' + appSettings.getString("useruid") + "/workouts");
}

module.exports.getWorkout = (id) => {
  return firebase.getValue('/workouts/'+ id);
}

module.exports.removeUserData  = (url) => {
  return firebase.remove('/users/' + appSettings.getString("useruid") + "/"  + url);
}

module.exports.pushUserData  = (url ,data) => {
  return firebase.push('/users/' + appSettings.getString("useruid") + "/"  + url, data);
}



module.exports.pushStatistics = (data, type) => {

  return firebase.push('/users/' + appSettings.getString("useruid") + "/statistics/" + type,
  {
    date:firebase.ServerValue.TIMESTAMP,
    data: data,
    userDate: (new Date).getTime()
  });
}


module.exports.getStatistics = (type) => {
  return firebase.getValue('/users/' + appSettings.getString("useruid") + "/statistics/" + type);
}

module.exports.updatePowerPoints = (newPoints) => {
  if(Number.isInteger(parseInt(newPoints))){ 

    console.log(1);
    return firebase.update(
      '/users/' + appSettings.getString("useruid") + "/powerPoints",
      parseInt(newPoints)
    )
  }
}

/* Database end */
quizComplate = (data) => {
    setUserData(data)
    .then(doc => {
        frame.topmost().navigate({
        moduleName: "views/trainer/trainer-page",
        animated: false});
        appSettings.setBoolean("quizIsComplate", true);
    })
    .catch(error => console.log("Error: " + error));
}
module.exports.quizComplate = quizComplate;


var quizIsComplate = () => {
    getUserData().then(data => {
        if (data.value != null && data.value.quizIsComplate == true) {
            frame.topmost().navigate({
                moduleName: "views/trainer/trainer-page",
                animated: false});
        }  
    });
}

module.exports.quizIsComplate = quizIsComplate;
 var Login = () => {

  firebase.getAuthToken({
    forceRefresh: false
  }).then(
      function (result) {
        appSettings.setString("token",  result.token);
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
            animated: false});
        } else {
          frame.topmost().navigate({
            moduleName: "views/quiz/quiz-page",
          animated: false});
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
frame.topmost().navigate({
  context: {model: model},
  moduleName: "views/schedule/schedule-page",
  animated: false});
}