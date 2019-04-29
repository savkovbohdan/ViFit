/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
const appSettings = require("application-settings");
Object.defineProperty(exports, "__esModule", { value: true });
const application = require("tns-core-modules/application");
var firebase = require("nativescript-plugin-firebase");
var frame = require("tns-core-modules/ui/frame");

firebase.init({
  persist: true
}).then(
  function () {
    startApp();
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
);


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

//application.run({ moduleName: ".app-root-app-quiz-page.xml" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
