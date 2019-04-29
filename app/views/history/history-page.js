Object.defineProperty(exports, "__esModule", { value: true });
const createViewModel = require("./history-view-model").createViewModel;
var frame_1 = require("tns-core-modules/ui/frame");
function onNavigatingTo(args) {
    const page = args.object;
    model = createViewModel();
    var gotData=page.navigationContext;
    model.set("db", gotData.db);
    page.bindingContext = model;
    model.set("page", page);
    model.loadDb();
    page.actionBarHidden = true;
}

exports.onNavigatingTo = onNavigatingTo;
// >> listview-swipe-action-release-notify
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
