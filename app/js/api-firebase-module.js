Object.defineProperty(exports, "__esModule", { value: true });
firebaseN = require("nativescript-plugin-firebase");
var frame = require("tns-core-modules/ui/frame");
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase/app");
/* Database */
var getQuizData  = () => {
  var user = firebase.firestore().collection("users").doc(appSettings.getString("useruid"));
  return user.get();
}
module.exports.getQuizData = getQuizData;
 quizSet = (data) => {
   console.log(appSettings.getString("useruid"));
   var user = firebase.firestore().collection("users").doc(appSettings.getString("useruid"));
  return user.set(data,  {merge: true});
}

module.exports.quizSet = quizSet;
/* Database end */
userCur = () => {
  firebaseN.getCurrentUser()
  const data = firebase.firestore().collection("users").doc(appSettings.getString("useruid")).collection("workouts")
  data.add({
  name: "San Francisco",
  state: "CA",
  country: "USA",
  capital: false,
  population: 860000
}).then(documentRef => {
  console.log(`San Francisco added with auto-generated ID: ${documentRef.id}`);
}).catch(error => console.log("Error: " + error));

}
module.exports.userCur = userCur;

quizComplate = (data) => {
    quizSet(data)
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
    getQuizData().then(doc => {
      if (doc.exists) {
        data = doc.data();
        if (data && data.quizIsComplate == true) {
            frame.topmost().navigate({
                moduleName: "views/trainer/trainer-page",
                animated: false});
        }
      }
    });
}

module.exports.quizIsComplate = quizIsComplate;
 var Login = () => {
    console.log(appSettings.getString("useruid"));
     getQuizData().then(doc => {
      if (doc.exists) {
       data = doc.data();
        if (data.quizIsComplate == 1) {
            appSettings.setBoolean("quizIsComplate", true);
            frame.topmost().navigate({
              moduleName: "views/trainer/trainer-page",
            animated: false});
        } else {
          frame.topmost().navigate({
            moduleName: "views/quiz/quiz-page",
          animated: false});
        }
      }else {
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
    firebase.auth().signOut()
      .then(() => console.log("Logout OK"))
      .catch(error => console.log("Logout error: " + JSON.stringify(error)));

    frame.topmost().navigate({
        moduleName: "views/auth/auth-page",
        animated: false
    });
}

module.exports.Logout = Logout;


