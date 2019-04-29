var Observable = require("data/observable").Observable;
var dialogs = require("tns-core-modules/ui/dialogs");
timerModule = require("tns-core-modules/timer");
var frame = require("tns-core-modules/ui/frame");
var Sqlite = require("nativescript-sqlite");
var api = require("../../js/api-firebase-module");
function createViewModel() {
    var viewModel = new Observable();
    viewModel.loadDb = function(){

        new Sqlite("ViFit.db", function(err, db){
            if (err){
              console.error("Не удалось подключиться к БД", err);
            }
            else {
                db.version(function(err, ver){
                    if (err){
                      console.error("Ошибка", err);
                    }
                    else if (ver === 0){
                        db.execSQL("CREATE TABLE IF NOT EXISTS runs (id INTEGER PRIMARY KEY AUTOINCREMENT, coords TEXT, datetime VARCHAR(50), distance UNSIGNED MEDIUMINT DEFAULT 0, time VARCHAR(10), steps UNSIGNED MEDIUMINT DEFAULT 0)").then(() => {}, error => {
                            console.log("Не удалось создать таблицу", error);
                        });
                        db.version(1);
                    }
                    viewModel.set('db', db);

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
                        //viewModel.set("historyList", allruns);
                    }, error => {
                        console.error("Ошибка", error);
                    });

                });
            }
        });

    
    }

    viewModel.set("historyList", [{time:1,id:1, prevDeltaX:0},{time:2,id:2, prevDeltaX:0},{time:3,id:3, prevDeltaX:0},{time:4,id:3, prevDeltaX:0},{time:5,id:3, prevDeltaX:0},{time:6,id:3, prevDeltaX:0},{time:7,id:3, prevDeltaX:0},{time:8,id:3, prevDeltaX:0}]);

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