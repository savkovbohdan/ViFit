Object.defineProperty(exports, "__esModule", { value: true });
//var firebase = require("nativescript-plugin-firebase");
var frame = require("tns-core-modules/ui/frame");
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase/app");
/* Database */
var getQuizData  = () => {
  var user = firebase.firestore().collection("users").doc(appSettings.getString("useruid"));
  return user.get();
    //return firebase.getValue('/users/' + appSettings.getString("useruid") + "/settings");
}
module.exports.getQuizData = getQuizData;


 quizSet = (data) => {
   console.log(appSettings.getString("useruid"));
   var user = firebase.firestore().collection("users").doc(appSettings.getString("useruid"));
  return user.set({data},  {merge: true});

 
  /*return firebase.setValue(
    '/users/' + appSettings.getString("useruid") + "/settings",
    data
  );*/


}
module.exports.quizSet = quizSet;
/* Database end */
userCur = () => {
  const data = firebase.firestore().collection("users").doc(appSettings.getString("useruid"));
 data.set({loh:"ds"},  {merge: true}).then(
  doc  => {
    console.log(doc);
  }
 ).catch(err => console.log(err));;
/*

  data.onSnapshot(doc => {
  if (doc.exists) {
    console.log("Document data:", JSON.stringify(doc.data()));
  } else {
    console.log("No such document!");
  }
});
*/

}
module.exports.userCur = userCur;

quizComplate = (data) => {
    quizSet(data)
    .then(doc => {
      console.log(doc);
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
    //firebase.logout();

    firebase.auth().signOut()
      .then(() => console.log("Logout OK"))
      .catch(error => console.log("Logout error: " + JSON.stringify(error)));

    frame.topmost().navigate({
        moduleName: "views/auth/auth-page",
        animated: false
    });
}

module.exports.Logout = Logout;


