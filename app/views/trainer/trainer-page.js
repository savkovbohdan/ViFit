Object.defineProperty(exports, "__esModule", { value: true });
const HomeViewModel = require("./trainer-view-model");
var page;
const application = require("tns-core-modules/application");
var mainViewModel;
var imageCache = require("nativescript-web-image-cache");
var platform = require("tns-core-modules/platform");

function onNavigatingTo(args) {
    if (application.android) {
        imageCache.initialize();
    }
    page = args.object;
    mainViewModel = HomeViewModel();

    page.bindingContext = mainViewModel;

    page.actionBarHidden = true;
    mainViewModel.page = page;

    mainViewModel.loadData();

}


function loaded(args) {
    if (application.android && platform.device.sdkVersion >= '21') {
        var View = android.view.View;
        var window = application.android.startActivity.getWindow();
        // set the status bar to Color.Transparent
        window.setStatusBarColor(0x000000);

        var decorView = window.getDecorView();
        decorView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
            | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        window.addFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}
exports.loaded = loaded;

/*
var k = [0.95, 0.9,0.85];

exports.onCardLoaded = function (args) {
    var i = 0;
    console.log(1212);
    var listClass = page.getElementsByClassName("card-item").reverse();
    console.log(listClass);
    for(var el in listClass){
        elem = listClass[el];
        if (i == 0){
            elem.classList.add('card-first');
        }
        if (i == 1){
            elem.classList.add('card-second');
            elem.scaleX = elem.scaleY = k[0];
            elem.translateX = 25;
        }
        if (i == 2){
            elem.scaleX = elem.scaleY = k[1];
     
            elem.translateX = 50;
            elem.classList.add('card-other');
        }
        if (i > 2){
            elem.scaleX = elem.scaleY = k[2];
            elem.translateX = 50;
            elem.opacity = 0;
            elem.classList.add('card-other');
        }
        i++;
    }
}



exports.onDrag = function (args) {
   // api.Logout();
    var cardFirts = page.getElementsByClassName('card-first')[0];
    var second = page.getElementsByClassName('card-second')[0];
    var other = page.getElementsByClassName('card-other').reverse();
    var triple = page.getElementsByClassName('card-other').reverse()[0];

    var hidden = page.getElementsByClassName('card-hidden');

    var w1 = cardFirts.getMeasuredWidth() / platform.screen.mainScreen.scale;
    if (isNaN(args.view.bindingContext.prevDeltaX)) {
        args.view.bindingContext.prevDeltaX = 0;
    }

    
 
    var delta = (args.deltaX < args.view.bindingContext.prevDeltaX) ? -1 : 1;
   // args.object.translateX += args.deltaX - args.view.bindingContext.prevDeltaX;
  //  args.view.bindingContext.prevDeltaX = args.deltaX;  
        if (args.state == 3) {
            if (args.deltaX < 0) {
                if (typeof second !== "undefined"){
                    if (typeof cardFirts !== "undefined")
                        cardFirts.animate({
                            translate: { x: -w1, y: 0 },
                            opacity: 0,
                            duration: 300,
                            curve: enums.AnimationCurve.easeInOut
                        }).then();

                    if (typeof second !== "undefined")
                        second.animate({
                            translate: { x: 0, y: 0 },
                            scale: { x: 1, y: 1 },
                            duration: 300,
                            curve: enums.AnimationCurve.easeInOut
                        });

                    if (typeof triple !== "undefined")
                        triple.animate({
                            translate: { x: 25, y: 0 },
                            scale: { x: 0.95, y: 0.95 },
                            duration: 300,
                            curve: enums.AnimationCurve.easeInOut
                    });

                    
                    if (typeof other[1] !== "undefined")
                    other[1].animate({
                        translate: { x: 50, y: 0 },
                        scale: { x: 0.90, y: 0.90 },
                        opacity:1,
                        duration: 300,
                        curve: enums.AnimationCurve.easeInOut
                    });
                }
            }else {
                if (typeof hidden[0] !== "undefined"){
                    if (typeof hidden[0] !== "undefined")
                    hidden[0].animate({
                        translate: { x: 0, y: 0 },
                        scale: { x: 1, y: 1 },
                        opacity:1,
                        duration: 300,
                        curve: enums.AnimationCurve.easeInOut
                    });

                    if (typeof cardFirts !== "undefined")
                    cardFirts.animate({
                        translate: { x: 25, y: 0 },
                        scale: { x: 0.95, y: 0.95 },
                        opacity: 1,
                        duration: 300,
                        curve: enums.AnimationCurve.easeInOut
                    }).then();

                    if (typeof second !== "undefined")
                    second.animate({
                        translate: { x: 50, y: 0 },
                        scale: { x: 0.90, y: 0.90},
                        duration: 300,
                        opacity: 1,
                        curve: enums.AnimationCurve.easeInOut
                    });

                    if (typeof triple !== "undefined")
                    triple.animate({
                        translate: { x: 30, y: 0 },
                        scale: { x: 0.85, y: 0.85 },
                        opacity:1,
                        duration: 300,
                        curve: enums.AnimationCurve.easeInOut
                    });
                }

            }
        }

        if (args.state == 3) {
            if (args.deltaX < 0) {
                if (typeof second !== "undefined"){
                    if (typeof cardFirts !== "undefined") {
                        cardFirts.classList.add("card-hidden");
                        cardFirts.classList.remove("card-first");
                    }

                    if (typeof second !== "undefined") {
                        second.classList.add("card-first");
                        second.classList.remove("card-second");
                    }


                    if (typeof triple !== "undefined") {
                        triple.classList.add("card-second");
                        triple.classList.remove("card-other");
                    }
                }
            }else {
                if (typeof hidden[0] !== "undefined"){
                    if (typeof hidden[0] !== "undefined") {
                        hidden[0].classList.add("card-first");
                        hidden[0].classList.remove("card-hidden");
                    }

                    if (typeof cardFirts !== "undefined") {
                        cardFirts.classList.add("card-second");
                        cardFirts.classList.remove("card-first");
                    }

                    if (typeof second !== "undefined") {
                        second.classList.add("card-other");
                        second.classList.remove("card-second");
                    }
                }


            }
        }
    


}
*/
exports.onNavigatingTo = onNavigatingTo;