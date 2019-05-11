const observableModule = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame");
const HomeViewModel = require("./schedule-view-model");
var mainViewModel;
function onNavigatingTo(args) {
    const page = args.object;
    mainViewModel = new HomeViewModel();
    page.bindingContext = mainViewModel;
    page.actionBarHidden = true;
    mainViewModel.page = page;
    var context = page.navigationContext;
    mainViewModel.mainContext = context.model;
    mainViewModel.run();
};

function loaded(args){
  
}

exports.loaded = loaded;
exports.onNavigatingTo = onNavigatingTo;