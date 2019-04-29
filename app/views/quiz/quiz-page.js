const observableModule = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame");
const HomeViewModel = require("./quiz-view-model");
var mainViewModel;
function onNavigatingTo(args) {
    const page = args.object;
    mainViewModel = new HomeViewModel();
    page.bindingContext = mainViewModel;
    page.actionBarHidden = true;
    mainViewModel.page = page;
    console.log(1);
    
};

function loaded(args){

    console.log(2);
    
    mainViewModel.run();
}

exports.loaded = loaded;
exports.onNavigatingTo = onNavigatingTo;