const observableModule = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame");
const HomeViewModel = require("./exercise-view-model");
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
    mainViewModel.userData = context.userData;
    mainViewModel.exercises = context.exercises;
};


function loaded(args){
    mainViewModel.run();
}

function unloaded(args){
    mainViewModel.pause();
}

exports.loaded = loaded;
exports.unloaded = unloaded;
exports.onNavigatingTo = onNavigatingTo;