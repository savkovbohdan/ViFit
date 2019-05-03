const observableModule = require("data/observable");

function CircularProgressBarViewModel() {
    var viewModel = observableModule.fromObject({
        offset: 0,
        textColor: '#FCD0AD',
        fillColor: '#FCD0AD',
        fillBackgroundColor: '#FEEFE3',
        height:"45",
        progress: 30,
        text: `${30}%`,
        textSize: 70 / 4
    });

    return viewModel;
}

module.exports = CircularProgressBarViewModel;
