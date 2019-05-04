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


