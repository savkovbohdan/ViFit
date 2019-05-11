Object.defineProperty(exports, "__esModule", { value: true });
var Observable = require("data/observable").Observable;
var geolocation = require("nativescript-geolocation");
const Color = require("color").Color;
//var mapsModule = require("nativescript-google-maps-sdk");
var pageModule = require("tns-core-modules/ui/page");
timerModule = require("tns-core-modules/timer");
var { Accuracy } = require("ui/enums");
var dialogs = require("ui/dialogs");
var frame = require("tns-core-modules/ui/frame");
var Sqlite = require("nativescript-sqlite");
var enums_1 = require("tns-core-modules/ui/enums");

function createViewModel() {
    var viewModel = new Observable();
    var watchId;
    var start_location;
    var current_location;
    viewModel.is_tracking = false;
    viewModel.latitude = 15.447819409392789;
    viewModel.longitude = 120.93888133764267;
    viewModel.zoom = 20;
    var total_distance = 0;
    var total_steps = 0;
    var locations = [];
    var mapView;
    var coord = [];
   //var marker = new mapsModule.Marker();
  //var polyline = new mapsModule.Polyline();
    var startTime = 0;
    var timerOne;
    viewModel.set('timer', "00:00:00");
    viewModel.set('distance', 0);
    viewModel.set('steps', 0);
    function CrateDb(){
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
                });
            }
        });
    }
    CrateDb();
    function timerTrackerUpadete(){
        var totalTime = Date.now() - startTime; 
        totalHour = Math.floor(totalTime / 3600000);
        totalMinutes = Math.floor(totalTime / 60000);
        totalSeconds = Math.floor((totalTime % 60000) / 1000);
        totalMilliseconds = (totalTime / 1000).toFixed(2);
        hourString = (totalHour < 10) ? ("0" + totalHour) : totalHour;
        minuteString = (totalMinutes < 10) ? ("0" + totalMinutes) : totalMinutes;
        secondString = (totalSeconds < 10) ? ("0" + totalSeconds) : totalSeconds;
        millisecondString = totalMilliseconds.toString().slice(-2);
        viewModel.set('timer', hourString + ":" + minuteString + ":" + secondString);
    }
    viewModel.openMenu = function(){
        var drawer = viewModel.page.getViewById("sideDrawer");
        drawer.toggleDrawerState();
    }
    viewModel.toHistory = function(){
        frame.topmost().navigate({
            moduleName: "views/history/history-page",
            animated: true,
            context: {db:viewModel.db},
            transition: {
            name: "slideLeft",
            duration: 200,
            curve: "linear"
            }});
    }
    viewModel.toEmail = function(){
        frame.topmost().navigate({
            moduleName: "views/email/email-page",
            animated: true,
            transition: {
            name: "slideLeft",
            duration: 200,
            curve: "linear"
            }});
    }
    viewModel.toContacts = function(){
        frame.topmost().navigate({
            moduleName: "views/contacts/contacts-page",
            animated: true,
            transition: {
            name: "slideLeft",
            duration: 200,
            curve: "linear"
            }});
    }

    setInterval(function (){
        geolocation.isEnabled().then(function (isLocationEnabled) {
            console.log(isLocationEnabled);
        }, function (e) {
        });
    }, 3000);

    viewModel.toggleTracking = function() {

            geolocation.isEnabled().then(function (isLocationEnabled) {
                if (!isLocationEnabled) {
                    geolocation.enableLocationRequest(false, true).then(function () {
                        ld();
                    }, function (e) {
                        ld();
                        dialogs.alert("Error: " + (e.message || e));
                    });
                }else {
                    ld();
                }
            }, function (e) {
            });

    }
    
    function ld(){
        viewModel.set('is_tracking', !viewModel.is_tracking);
        if (viewModel.is_tracking) {
            startTime = Date.now();
            timerOne = setInterval(timerTrackerUpadete, 10);
            viewModel.set('distance', total_distance);
            viewModel.set('steps', total_steps);
            geolocation.getCurrentLocation(
                {
                    desiredAccuracy: Accuracy.high, 
                    updateDistance:5, 
                    timeout: 3000
                }
            ).then(function(loc) {
                if (loc) {
                    start_location = loc;
                    locations.push(start_location);
                    coord.push({lat:loc.latitude, long: loc.longitude}); 
                    viewModel.set('latitude', loc.latitude);
                    viewModel.set('longitude', loc.longitude);
                 //  marker.position = mapsModule.Position.positionFromLatLng(viewModel.latitude, viewModel.longitude); 
                }
            }, function(e){
                dialogs.alert(e.message);
            });  

            watchId = geolocation.watchLocation(
                function (loc) {
                    if (loc) {
                        current_location = loc;
                        locations.push(loc);
                        viewModel.set('latitude', loc.latitude);
                        viewModel.set('longitude', loc.longitude);
                        coord.push({lat:loc.latitude, long: loc.longitude}); 
                        console.log(coord);        
                        if(coord.length > 1){
                       // polyline = new mapsModule.Polyline();
                      //  polyline.visible = true;
                      //  polyline.width = 8;
                      //  polyline.geodesic = false;
                      //  polyline.color = new Color("#DD00b3fd");
                            for (var cr in coord) {
                             //   polyline.addPoint(mapsModule.Position.positionFromLatLng(coord[cr].lat, coord[cr].long));
                            }
                           // mapView.addPolyline(polyline);
                        }     
                      //  marker.position = mapsModule.Position.positionFromLatLng(viewModel.latitude, viewModel.longitude);  
                        location_count = locations.length;
                        if (location_count >= 2) {
                            var distance = Math.round(geolocation.distance(locations[location_count - 2], locations[location_count - 1]));
                            var steps = Math.round(distance * 1.3123);
                            total_distance = total_distance + distance;
                            total_steps = total_steps + steps;
                            viewModel.set('distance', total_distance);
                            viewModel.set('steps', total_steps);
                        }                  
                    }
                }, 
                function(e){
                    dialogs.alert(e.message);
                }, 
                {
                    desiredAccuracy: enums_1.Accuracy.high,
                    updateDistance: 1,
                    updateTime: 3000,
                    minimumUpdateTime: 100
                }
            );
        } else {
            geolocation.clearWatch(watchId);
            clearInterval(timerOne);
            nowDate = new Date();
            var date=((nowDate.getMonth()<9) ? "0"+(nowDate.getMonth()+1) : (nowDate.getMonth()+1))+"."+((nowDate.getDate()<10) ? "0"+nowDate.getDate() : nowDate.getDate()) + "."+ nowDate.getFullYear() + " - " + ((nowDate.getHours()<10) ? "0"+nowDate.getHours() : nowDate.getHours()) + ":" + ((nowDate.getMinutes()<10) ? "0"+nowDate.getMinutes() : nowDate.getMinutes());
            viewModel.db.execSQL("INSERT INTO runs (coords, datetime, distance, time, steps) VALUES (?, ?, ?, ?, ?)", [coord, date, total_distance, viewModel.timer, total_steps]).then(id => {
                console.log("INSERT RESULT", id);
            }, error => {
                console.log("INSERT ERROR", error);
            });
            viewModel.set('distance', total_distance);
            viewModel.set('steps', total_steps);
            total_distance = 0;
            total_steps = 0;
            coord = [];
            locations = [];
        }
    }

    viewModel.getButtonStyle = function() {
        if (viewModel.is_tracking) {
            return 'btn-stop';
        }
        return 'btn';
    }
    viewModel.getButtonLabel = function() {
        if (viewModel.is_tracking) {
            return 'Закончить бег';
        }
        return 'Начать бег';
    }
 

    viewModel.onMapReady = function(args) {
        //mapView = args.object;
    }

    return viewModel;
}
exports.createViewModel = createViewModel;