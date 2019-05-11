const CircularProgressBarViewModel = require("./circular-progress-bar-view-model");
require("nativescript-dom");
var el;
exports.onLoaded = function (args) {
    el = args.object;
  /*  const circularProgressBarVm = new CircularProgressBarViewModel();
    args.object.bindingContext = circularProgressBarVm;
   
    if(typeof args.object.text != "undefined"){
        circularProgressBarVm.text = args.object.text;
    }

    if(typeof args.object.prog != "undefined"){
   ////     circularProgressBarVm.progress = args.object.progress;
        console.log( args.object.progress);
    }


    args.object.update = function (cpProgress, text, textextSize) {
        circularProgressBarVm.height = Math.min(cpSize, 250);
        circularProgressBarVm.textSize = textSize;

        circularProgressBarVm.progress = Math.min(cpProgress, 100);
        circularProgressBarVm.text = text;
    }   */

    args.object.update = function (cpProgress) {
        el.getElementsByClassName('progress-setter')[0].scales.getItem(0).indicators.getItem(1).maximum = Math.min(cpProgress, 100);
    } 
};
