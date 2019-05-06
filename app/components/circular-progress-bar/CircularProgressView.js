const CircularProgressBarViewModel = require("./circular-progress-bar-view-model");


exports.onLoaded = function (args) {
    const circularProgressBarVm = new CircularProgressBarViewModel();
    args.object.bindingContext = circularProgressBarVm;
    if(typeof args.object.text != "undefined"){
        circularProgressBarVm.text = args.object.text;
    }

    if(typeof args.object.progress != "undefined"){
        circularProgressBarVm.progress = args.object.progress;
       
      //  progress.maximum =  args.object.progress;
    }


    args.object.update = function (cpProgress, text, textextSize) {
        circularProgressBarVm.height = Math.min(cpSize, 250);
        circularProgressBarVm.textSize = textSize;

        circularProgressBarVm.progress = Math.min(cpProgress, 100);
        circularProgressBarVm.text = text;
    }   
};
