Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
var dialogs = require("tns-core-modules/ui/dialogs");
var platform = require("platform");
require("nativescript-dom");
var enums = require("tns-core-modules/ui/enums");
var animations = require("../../js/animation-module");
var api = require("../../js/api-firebase-module");
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
  
    tabsName:["Тренировки", "Магазин", "Статистика", "Награды"],

    onSelectedIndex:function(args) {
      viewModel.setTabText(args);
    },

    tabLoaded:function(args){
      viewModel.setTabText(args);
    },
    setTabText:function(args){
      viewModel.page.runAgainstClasses('tab', function(elem) {  
        if(elem.classList.contains('active-tab')){
          elem.classList.remove('active-tab');
          str = elem.title;
          elem.title = str.substr(-20,1);
        }
      });
      el =   viewModel.page.getElementsByClassName('tab')[args.object.selectedIndex];
      el.classList.add('active-tab');
      el.title += '\n' +  viewModel.tabsName[args.object.selectedIndex];
    }


  });
  viewModel.set("hBgheader", (platform.screen.mainScreen.heightDIPs * 0.40));
  return viewModel;
}
module.exports = HomeViewModel;

