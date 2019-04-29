Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
function animate(el, time, to, prop) {
    var timeElapsed = rxjs_1.Observable.defer(function () {
        var start = rxjs_1.Scheduler.animationFrame.now();
        return rxjs_1.Observable.interval(1)
            .map(function () { return Math.floor((Date.now() - start)); });
    });
    var duration = function (totalMs) {
        return timeElapsed
            .map(function (elapsedMs) { return elapsedMs / totalMs; })
            .takeWhile(function (t) { return t <= 1; });
    };
    var con = 0;
    var amount = function (d, n) {
        return function (t) {
            z = d - n;
            con++;
            return t * z + n;

        };
    };
    var elasticOut = function (t) {
        return t > 0.5 ? 4 * Math.pow((t - 1), 3) + 1 : 4 * Math.pow(t, 3);
    };
    var from = 0;
    if (prop == "mt")
        from = el.marginTop;
    if (prop == "mb")
        from = el.marginBottom;
    if (prop == "ml")
        from = el.marginLeft;
    if (prop == "mr")
        from = el.marginRight;
    if (prop == "h")
        from = el.height;
    if (prop == "w")
        from = el.width;
    if (prop == "w%") {
        console.log(el.width);
        if (typeof el.width.value != "undefined") {
            from = el.width.value * 100;
            console.log(from);
        }
        else {
            from = el.width;
        }
    }
    this.mt = from;
    /*
    console.log("time: " + time);
    console.log("from: " + from);
    console.log("to: " + to);
    */
    duration(time)
        .map(elasticOut)
        .map(amount(to, from))
        .subscribe(function (newVal) {
            if (prop == "mt") {
                return el.marginTop = newVal;
                //return this.set('mt', newVal);
            }
            if (prop == "mb")
                return el.marginBottom = newVal;
            if (prop == "ml")
                return el.marginLeft = newVal;
            if (prop == "mr")
                return el.marginRight = newVal;
            if (prop == "h")
                return el.height = newVal;
            if (prop == "w")
                return el.width = newVal;
            if (prop == "w%") {
                if (typeof el.width.value != "undefined") {
                    el.width = newVal + "%";
                    return newVal;
                }
                else {
                    el.width = newVal + "%";
                    return newVal;
                }
            }
        });
}
module.exports.animate = animate;

