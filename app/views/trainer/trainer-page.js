Object.defineProperty(exports, "__esModule", { value: true });
const HomeViewModel = require("./trainer-view-model");
var frame_1 = require("tns-core-modules/ui/frame");
require("nativescript-dom");
var platform = require("tns-core-modules/platform");
var enums = require("tns-core-modules/ui/enums");
var api = require("../../js/api-firebase-module");
var page;
function onNavigatingTo(args) {
    page = args.object;
    mainViewModel = HomeViewModel();
    page.bindingContext = mainViewModel;
    //api.userCur();
    page.actionBarHidden = true;
    mainViewModel.page = page;
}

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

  


/*
exports.onDrag = function (args) {
    var cardFirts = page.getElementsByClassName('card-first')[0];
    var second =  page.getElementsByClassName('card-second')[0];
    var other = page.getElementsByClassName('card-other');
    var triple = page.getElementsByClassName('card-other')[0];
    var w1 = cardFirts.getMeasuredWidth() / platform.screen.mainScreen.scale;
    
    var k1 = Math.abs(args.deltaX / w1);
    if(k1 > 0.3)
        k1 = 0.3;
    
    console.log("k1 " + k1);
    if (isNaN( args.view.bindingContext.prevDeltaX)) {
        args.view.bindingContext.prevDeltaX = 0;
    }

    var delta = (args.deltaX < args.view.bindingContext.prevDeltaX) ? -1 : 1;

    args.object.translateX += args.deltaX -  args.view.bindingContext.prevDeltaX;

    

    if(args.state == 2)
        if (args.deltaX < 0) {
            if(delta > 0){             
                //Перемещение
                if(second.translateX < 25)
                    second.translateX += second.translateX * (1-k1);
                if(second.translateX > 25)
                    second.translateX = 25;
                //Рзамер
                if(second.scaleX > k[0])
                    second.scaleX = second.scaleY -= second.scaleY * (k1) * (k1) * (k1) * (k1) * (k1) *0.5;
                if(second.scaleX < k[0])
                    second.scaleX = second.scaleY = k[0];      
                    
                //для 3
                //Перемещение
                if(triple.translateX < 50)
                    triple.translateX += triple.translateX * (1-k1) * 0.2;
                if(triple.translateX > 50)
                    triple.translateX = 50;
               
                    //Рзамер
                if(triple.scaleX > k[1])
                    triple.scaleX = triple.scaleY -= triple.scaleY * (k1) * (k1) * (k1) * (k1) * (k1) * 0.5;
                if(triple.scaleX < k[1])
                    triple.scaleX = triple.scaleY = k[1];  

            }else {
                //Перемещение
                second.translateX += second.translateX * k1 * delta;
                //Рзамер
                if(second.scaleX < 1)
                    second.scaleX = second.scaleY += second.scaleY * k1 * k1 * k1 * k1;
                if (second.scaleX > 1)
                    second.scaleX = second.scaleY = 1;

                //для 3
                if(triple.translateX > 25)
                     triple.translateX += triple.translateX * k1 * delta;
                if(triple.translateX < 25)
                     triple.translateX = 25;
                //Рзамер
                if(triple.scaleX < k[1])
                    triple.scaleX = triple.scaleY += triple.scaleY * k1 * k1 * k1 * k1;
                if (triple.scaleX >  k[1])
                    triple.scaleX = triple.scaleY = k[1];
            }
        }else{
            //Перемещение
            if(second.translateX < 25)
                second.translateX += 25 * (1 - k[0]);
            if(second.translateX > 25)
                second.translateX = 25;        
            //Рзамер
            if(second.scaleX > k[0])
                second.scaleX = second.scaleY -= k[0] * (1 - k[0]) * (1 - k[0]);
            if(second.scaleX < k[0])
                second.scaleX = second.scaleY = k[0];

            //для 3
            //Перемещение
            if(triple.translateX < 50)
                triple.translateX += 50 * (1 - k[1]) * 0.2;
            if(triple.translateX > 50)
                triple.translateX = 50;        
            //Рзамер
            if(triple.scaleX > k[1])
                triple.scaleX = triple.scaleY -= k[1] * (1 - k[1]) * (1 - k[1])  * 0.2;
            if(triple.scaleX < k[1])
                triple.scaleX = triple.scaleY = k[1];
        }

    


    args.view.bindingContext.prevDeltaX = args.deltaX;
    
}
*/


/*
exports.onDrag = function (args) {
    if (isNaN(args.view.bindingContext.prevDeltaX)) {
        args.view.bindingContext.prevDeltaX = 0;
    }
    if (args.deltaX < 0) {
        args.object.translateX += args.deltaX - args.view.bindingContext.prevDeltaX;
        args.view.bindingContext.prevDeltaX = args.deltaX;

        if (args.deltaX >= -25) {
            if (page.getElementsByClassName('card-second').length > 0)
                page.getElementsByClassName('card-second')[0].animate({
                    scale: { x: 1, y: 1 },
                    translate: { x: page.getElementsByClassName('card-second')[0].translateX + args.deltaX, y: 0 },
                    duration: 500,
                    curve: enums.AnimationCurve.easeInOut
                });
        }
        if (args.state == 3) {
            if (args.deltaX < -25) {
                console.log(1);
                args.object.animate({
                    translate: { x: -400, y: 0 },
                    opacity: 0,
                    duration: 500,
                    curve: enums.AnimationCurve.linear
                });

                args.object.classList.add('card-hidden');

                if (page.getElementsByClassName('card-second').length > 0)
                    page.getElementsByClassName('card-second')[0].classList.remove('card-second');

                if (page.getElementsByClassName('card-other').length > 0)
                    page.getElementsByClassName('card-other')[0].classList.add('card-second');

                if (page.getElementsByClassName('card-other').length > 0)
                    page.getElementsByClassName('card-other')[0].classList.remove('card-other');

            } else {
                console.log(2);
                if (page.getElementsByClassName('card-second').length > 0)
                    page.getElementsByClassName('card-second')[0].animate({
                        scale: { x: 0.95, y: 0.95 },
                        translate: { x: 25, y: 0 },
                        duration: 500,
                        curve: enums.AnimationCurve.easeInOut
                    });
                args.object.animate({
                    scale: { x: 1, y: 1 },
                    translate: { x: 0, y: 0 },
                    duration: 500,
                    curve: enums.AnimationCurve.easeInOut
                });
            }
        }
    } else {
        if (args.state == 3) {
            if (page.getElementsByClassName('card-hidden').length > 0) {
                prevElement = page.getElementsByClassName('card-hidden')[0];

                if (args.deltaX > 20) {
                    console.log(3);
                    args.object.translateX += args.deltaX - args.view.bindingContext.prevDeltaX;
                    args.view.bindingContext.prevDeltaX = args.deltaX;
                    
                    prevElement.translateX = 0;

                    if (page.getElementsByClassName('card-second').length > 0) {
             
                        page.getElementsByClassName('card-second')[0].classList.add('card-other');
                        page.getElementsByClassName('card-second')[0].classList.remove('card-second');
                    }

                    args.object.classList.add('card-second');
                    prevElement.classList.remove('card-hidden');


                }

            }
        }
    }
}
*/
exports.onNavigatingTo = onNavigatingTo;
function onSwipeCellProgressChanged(args) {
    var swipeLimits = args.data.swipeLimits;
    var currentItemView = args.object;
    if (args.data.x > 200) {
        console.log("Notify perform left action");
    }
    else if (args.data.x < -200) {
        console.log("Notify perform right action");
    }
}
exports.onSwipeCellProgressChanged = onSwipeCellProgressChanged;
// << listview-swipe-action-release-notify
// >> listview-swipe-action-release-limits
function onSwipeCellStarted(args) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args.object;
    var leftItem = swipeView.getViewById('mark-view');
    var rightItem = swipeView.getViewById('delete-view');
    swipeLimits.left = leftItem.getMeasuredWidth();
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
}
exports.onSwipeCellStarted = onSwipeCellStarted;
// << listview-swipe-action-release-limits
// >> listview-swipe-action-release-execute
function onSwipeCellFinished(args) {
}
exports.onSwipeCellFinished = onSwipeCellFinished;
// << listview-swipe-action-release-execute
// >> listview-swipe-action-handlers
function onLeftSwipeClick(args) {
    var listView = frame_1.topmost().currentPage.getViewById("listView");
    console.log("Left swipe click");
    listView.notifySwipeToExecuteFinished();
}
exports.onLeftSwipeClick = onLeftSwipeClick;
function onRightSwipeClick(args) {
    var listView = frame_1.topmost().currentPage.getViewById("listView");
    console.log("Right swipe click");
    var viewModel = listView.bindingContext;
    viewModel.dataItems.splice(viewModel.dataItems.indexOf(args.object.bindingContext), 1);
}
exports.onRightSwipeClick = onRightSwipeClick;
// << listview-swipe-action-handlers
