Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = require("../../js/api-firebase-module");
var gF = require("../../js/global-functions");
var observableModule = require("tns-core-modules/data/observable");
var ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var enums = require("tns-core-modules/ui/enums");
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
var firebaseW = require("nativescript-plugin-firebase/app");
var platform = require("tns-core-modules/platform");
const Label = require("tns-core-modules/ui/label").Label;
//коефециенты для карусели
var k = [0.9, 0.8, 0.7];
var tr = [18, 35, 25];
var platform = require("platform");
require("nativescript-dom");
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    listenerOn: false,
    tabsName: ["Тренировки", "Магазин", "Статистика", "Награды"],
    onSelectedIndex: function (args) {
      viewModel.setTabText(args);
    },
    tabLoaded: function (args) {
      setTimeout(() => {
        viewModel.setTabText(args);
      }, 1);
    },
    setTabText: function (args) {
      viewModel.page.runAgainstClasses('tab', function (elem) {
        if (elem.classList.contains('active-tab')) {
          elem.classList.remove('active-tab');
          str = elem.title;
        //  console.log("text tab: " + str.substr(-20, 1));

          elem.title = str.substr(-20, 1);
        }
      });
      el = viewModel.page.getElementsByClassName('tab')[args.object.selectedIndex];
      el.classList.add('active-tab');
      el.title += '\n' + viewModel.tabsName[args.object.selectedIndex];
    }
  });
  //viewModel.set("hBgheader", (platform.screen.mainScreen.heightDIPs * 0.40));
  return viewModel;
}
module.exports = HomeViewModel;
