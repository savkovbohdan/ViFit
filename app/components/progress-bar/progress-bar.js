const ProgressBarViewModel = require("./progress-bar-view-model");
var animations = require("../../js/animation-module");
require("nativescript-dom");
exports.onLoad = args => {
    const circularProgressBarVm = new ProgressBarViewModel();
    args.object.bindingContext = circularProgressBarVm;
    circularProgressBarVm.el = args.object;
    args.object.update = function (progress) {
       
       el =  circularProgressBarVm.el.getElementsByClassName('progress')[0];
      
      animations.animate(el,700,progress, "w%")
        //circularProgressBarVm.progress = Math.min(progress, 100);
    }   
};
