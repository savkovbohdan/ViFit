const observableModule = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame");
const HomeViewModel = require("./auth-view-model");
var mainViewModel;
function onNavigatingTo(args) {
    const page = args.object;
    mainViewModel = new HomeViewModel();
    page.bindingContext = mainViewModel;
    page.actionBarHidden = true;
    mainViewModel.page = page;
};

exports.onNavigatingTo = onNavigatingTo;
