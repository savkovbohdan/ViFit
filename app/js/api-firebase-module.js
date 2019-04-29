Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var frame = require("tns-core-modules/ui/frame");
const appSettings = require("application-settings");


/* Database */
var getQuizData  = () => {
    return firebase.getValue('/users/' + appSettings.getString("useruid") + "/settings");
}
module.exports.getQuizData = getQuizData;


 quizSet = (data) => {
  return firebase.setValue(
    '/users/' + appSettings.getString("useruid") + "/settings",
    data
  );
}
module.exports.quizSet = quizSet;

/* Database end */


quizComplate = (data) => {
    quizSet(data)
    .then(result => {
      console.log(result);
        frame.topmost().navigate({
        moduleName: "views/trainer/trainer-page",
        animated: false});
        appSettings.setBoolean("quizIsComplate", true);
    })
    .catch(error => console.log("Error: " + error));
}


module.exports.quizComplate = quizComplate;

var quizIsComplate = () => {
    getQuizData().then().then(result => {
        if (result.value && result.value.quizIsComplate == true) {
            frame.topmost().navigate({
                moduleName: "views/trainer/trainer-page",
                animated: false});
        }
    });
}

module.exports.quizIsComplate = quizIsComplate;


 var Login = () => {
     getQuizData().then().then(result => {
        if (result.value && result.value.quizIsComplate == 1) {
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
  console.log(1);
    appSettings.clear();
    firebase.logout();
    frame.topmost().navigate({
        moduleName: "views/auth/auth-page",
        animated: false
    });
}

module.exports.Logout = Logout;


