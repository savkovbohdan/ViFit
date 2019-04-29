const observableModule = require("data/observable");

function ProgressBarViewModel() {
    var viewModel = observableModule.fromObject({
        progress: 0
    });

    return viewModel;
}

module.exports = ProgressBarViewModel;
