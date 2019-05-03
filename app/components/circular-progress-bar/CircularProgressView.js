const CircularProgressBarViewModel = require("./circular-progress-bar-view-model");


exports.onLoaded = function (args) {
    const circularProgressBarVm = new CircularProgressBarViewModel();
    args.object.bindingContext = circularProgressBarVm;

    args.object.update = function (cpSize, cpProgress, text) {
        circularProgressBarVm.height = Math.min(cpSize, 250);
        circularProgressBarVm.textSize = circularProgressBarVm.height / 3.5;

        circularProgressBarVm.progress = Math.min(cpProgress, 100);
        circularProgressBarVm.text = text;
    }   
};
