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
  

  });
  viewModel.set("hBgheader", (platform.screen.mainScreen.heightDIPs * 0.40));
  return viewModel;
}
module.exports = HomeViewModel;

