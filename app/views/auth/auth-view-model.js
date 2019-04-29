Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
//var firebase = require("nativescript-plugin-firebase/app");
var dialogs = require("tns-core-modules/ui/dialogs");
var platform = require("platform");
require("nativescript-dom");
var enums = require("tns-core-modules/ui/enums");
var animations = require("../../js/animation-module");
var api = require("../../js/api-firebase-module");
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    state: 0,
    hBgheader: 0,
    email: '',
    password: '',
    passwordCorrect:'',
    slogan: "Твой виртуальный фитнес-тренер",
    mt: 0,
    authState: function (args) {
      args.object.animate({
        scale: { x: 0.95, y: 0.95 },
        duration: 300,
        curve: enums.AnimationCurve.easeInOut
      });
      if (!args.object.classList.contains("active")) {
        this.page.getElementsByClassName('active')[0].classList.add("no-active");
        this.page.getElementsByClassName('active')[0].classList.remove("active");
        args.object.classList.remove("no-active");
        args.object.classList.add("active");
        this.page.getElementsByClassName('no-active')[0].animate({
          scale: { x: 0.95, y: 0.95 },
          duration: 300,
          curve: enums.AnimationCurve.easeInOut
        });
        this.page.getElementsByClassName('active')[0].animate({
          scale: { x: 1, y: 1 },
          duration: 300,
          curve: enums.AnimationCurve.easeInOut
        });
        if (this.state == 0) {
          this.state = 1;
          this.page.getElementsByClassName('h-input')[0].animate({
            scale: { x: 1, y: 1 },
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
          this.page.getElementsByClassName('social-auth')[0].animate({
            translate: { x: 0, y: 0 },
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
          this.page.getElementsByClassName('bg-logo')[0].animate({
            translate: { x: 0, y: -80 },
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
          animations.animate(this.page.getElementsByClassName('auth-form')[0], 250, -55, "mt");
          this.page.getElementsByClassName('logo-vifit')[0].animate({
            scale: { x: 0.8, y: 0.8 },
            translate: { x: 0, y: 25 },
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
        } else {
          this.page.getElementsByClassName('h-input')[0].animate({
            scale: { x: 0, y: 0 },
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
          this.page.getElementsByClassName('social-auth')[0].animate({
            translate: { x: 0, y: -80 },
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
          this.page.getElementsByClassName('container')[0].animate({
            translate: { x: 0, y: 0 },
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
          this.page.getElementsByClassName('logo-vifit')[0].animate({
            scale: { x: 1, y: 1 },
            translate: { x: 0, y: 0 },
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
          this.page.getElementsByClassName('bg-logo')[0].animate({
            translate: { x: 0, y: 0 },
            duration: 300,
            curve: enums.AnimationCurve.easeInOut
          });
          animations.animate(this.page.getElementsByClassName('auth-form')[0], 300, 20, "mt");
          this.state = 0;
        }
      }
    },
    auth: function (args) {
      firebase.login(
        {
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: this.email,
            password: this.password
          }
        })
        .then(function (result) {

          appSettings.setString("useruid", result.uid);
          api.Login();

        })
        .catch(error => {
          dialogs.alert({
            title: "Неверный email или пароль",
            message: "Неверный email или пароль",
            okButtonText: "Ок"
          })
        });
    },
    registration: function (args) {
      if(this.password != this.passwordCorrect)
        dialogs.alert({
          title: "Пароли не совпадают",
          message: "Введите еще-раз",
          okButtonText: "Ок"
        })
      else
      firebase.createUser({
        email: this.email,
        password: this.password
      }).then(
        function (user) {
          console.log(1);
          appSettings.setString("useruid", user.uid);
          api.Login();

        },
        function (errorMessage) {
          dialogs.alert({
            title: "Email уже существует",
            message: "Ошибка",
            okButtonText: "Ок"
          })
        }
      );
    },
    authGoogle: function (args) {
      firebase.login({
        type: firebase.LoginType.GOOGLE,
      }).then(
        function (result) {
          appSettings.setString("useruid", result.uid);
          api.Login();
        },
        function (errorMessage) {
           dialogs.alert({
            title: "Неизвестная ошибка",
            message: "Ошибка",
            okButtonText: "Ок"
          })
        }
      );
    },

  });
  viewModel.set("hBgheader", (platform.screen.mainScreen.heightDIPs * 0.40));
  return viewModel;
}
module.exports = HomeViewModel;

