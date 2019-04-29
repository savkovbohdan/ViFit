var Observable = require("data/observable").Observable;
var dialogs = require("tns-core-modules/ui/dialogs");
timerModule = require("tns-core-modules/timer");
var frame = require("tns-core-modules/ui/frame");
function createViewModel() {
    var viewModel = new Observable();
    viewModel.loadDb = function(){
        viewModel.db.all('select * from runs order by id desc').then(resultSet => {
            allruns=[];
            resultSet.forEach(function(item){          
                newItem={};
                newItem.id=item[0];
                newItem.coords=item[1];
                newItem.datetime=item[2];
                newItem.distance=item[3];
                newItem.time=item[4];
                newItem.steps=item[5];
                allruns.push(newItem);
            });
            viewModel.set("historyList", allruns);
        }, error => {
            console.error("Ошибка", error);
        });
    }
    viewModel.onDelateList = function(args){
        var id = args.view.bindingContext.id;
        viewModel.db.execSQL("DELETE FROM runs WHERE id=?", id).then((err) => {
            if(err!=0){
                dialogs.alert({
                    title: "Уведомление",
                    message: "Удаление произошло успешно!",
                    okButtonText: "Закрыть"});
                    viewModel.loadDb();
            } else dialogs.alert({
                    title: "Ошибка",
                    message: "Не удалось удалить! RUUUUUN!",
                    okButtonText: "Run run!"});
        });
    }

    viewModel.onBack = function(args){
        frame.topmost().navigate({
            moduleName: "views/tracker/tracker-page",
            animated: true,
            transition: {
            name: "slideLeft",
            duration: 200,
            curve: "linear"
        }});  
    }

    return viewModel;
}


exports.createViewModel = createViewModel;