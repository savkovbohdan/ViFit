const createViewModel = require("./tracker-view-model").createViewModel;
function onNavigatingTo(args) {
    const page = args.object;
    model = createViewModel();
    page.bindingContext = model;
    model.set("page", page);
    page.actionBarHidden = true;
}

exports.onNavigatingTo = onNavigatingTo;
