const appSettings = require("application-settings");
Object.defineProperty(exports, "__esModule", { value: true });
const application = require("tns-core-modules/application");
var firebase = require("nativescript-plugin-firebase");


firebase.init({
  persist: true,
  storageBucket: 'gs://vifit-1e403.appspot.com'
});



//Проверка какую страницу запускат;
if (appSettings.getString("useruid") == null) {
  application.run({ moduleName: "app-auth-page" });
} else {
  if (appSettings.getBoolean("quizIsComplate")) {
  application.run({ moduleName: "app-root" });
  } else {
   application.run({ moduleName: "app-quiz-page" });
  }
}



