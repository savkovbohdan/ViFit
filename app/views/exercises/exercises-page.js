const observableModule = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame");
const HomeViewModel = require("./exercises-view-model");
var imageCache = require("nativescript-web-image-cache");
const application = require("tns-core-modules/application");
var mainViewModel;
function onNavigatingTo(args) {
    if (application.android) {
        imageCache.initialize();
    }
    const page = args.object;
    mainViewModel = new HomeViewModel();
    page.bindingContext = mainViewModel;
    page.actionBarHidden = true;
    mainViewModel.page = page;
    var context = page.navigationContext;
    mainViewModel.mainContext = context.model;
    mainViewModel.info = context.data;
    mainViewModel.run();
};

function loaded(args){
  
}

exports.loaded = loaded;
exports.onNavigatingTo = onNavigatingTo;