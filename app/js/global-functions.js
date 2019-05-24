Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Поиск не пройденной тренировки и вывод информации о ней
 * @param  {} searchWorkoutId - идентификатор искоемой программы
 * @param  {} workoutData - данные искоемой программы
 * @param  {} data - список пользовательских тренировок
 */
module.exports.getCurrentWorkout = (searchWorkoutId, workoutData, data) => {
    var fullTimes = 0;
    var exercisesCount=0;
    var complateCount = 0;
    needDay = null;
    needUserDay = null;
    listExercises = [];
    var url = {};
    if(typeof workoutData.days == "undefined")
        return null

    arrayDays =  Object.entries(workoutData.days);
      arrayDays =  arrayDays.sort((a, b) => {
        if (a[1].index <=  b[1].index)
          return -1;
        else 1
      });

      if (typeof data != "undefined") {
        workouts = Object.assign({}, data);
        for (workout in workouts) {
          if(needDay != null)
            break
          if (typeof workouts[workout].idWorkout != "undefined" && workouts[workout].idWorkout == searchWorkoutId) {
            if (typeof workouts[workout].days != "undefined") {
              userArrayDay = workouts[workout].days;
              for(day in arrayDays){
                if(needDay != null)
                   break
                for(userDay in userArrayDay){
                  if(needDay != null)
                   break
                  if(userArrayDay[userDay].idDay == arrayDays[day][0]){
                    if(typeof userArrayDay[userDay].userDateComplate == "undefined")
                      userArrayDay[userDay].userDateComplate = 1;
                    if(userArrayDay[userDay].isComplate != true || new Date(userArrayDay[userDay].userDateComplate).toDateString() == new Date().toDateString()){
                       needDay = arrayDays[day][1];
                       needUserDay = userArrayDay[userDay];
                       url.workoutUserId = workout;
                       url.workoutUserDayId = userDay;
                       url.idWorkout =  workouts[workout].idWorkout;
                       url.workoutIdDay = arrayDays[day][0];
                    }
                  }
                }
              }
            }else{
              needDay = arrayDays[0][1];
              needUserDay = [];
              url.workoutUserId = workout;
              url.idWorkout =  workouts[workout].idWorkout;
              url.workoutUserDayId = null;
              url.workoutIdDay = arrayDays[0][0];
            }
          }
        }
        if(typeof needDay == "undefined" || needDay == null){
          console.log("Программа завершина");
        }else{
          //нашли нужный день
          if(typeof needDay.exercises != "undefined" ){
            exercises =  Object.entries(needDay.exercises);
            exercises =  exercises.sort((a, b) => {
              if (a[1].index <=  b[1].index)
                return -1;
              else 1
            });
            for(ex in exercises){
              if(typeof needUserDay.exercises != "undefined"){
                for(ud in needUserDay.exercises){
                  if(exercises[ex][0] == needUserDay.exercises[ud].idExercises &&
                    needUserDay.exercises[ud].isComplate == true){
                    exercises[ex][1].isComplate = true;
                    complateCount++;
                    break;
                  }
                }
              }else {
                exercises[ex][1].isComplate = false;
              }
              setsCount = 0;
              times = 0
              if(typeof exercises[ex][1].sets != "undefined"){
                for(set in exercises[ex][1].sets){
                  if(typeof exercises[ex][1].sets[set].time != "undefined"){
                    times += exercises[ex][1].sets[set].time;
                    fullTimes += exercises[ex][1].sets[set].time;
                  }
                  if(typeof exercises[ex][1].sets[set].relaxTime != "undefined"){
                    fullTimes += exercises[ex][1].sets[set].relaxTime;
                  }   
                  setsCount++;
                }
                exercises[ex][1].setsCount = setsCount;
                exercises[ex][1].times = (times/60).toFixed(2);
              }
              if(ex == 0){
                exercises[ex][1].isFirst = true;
              }
              if(exercises.length -1 == ex){
                exercises[ex][1].isLast = true;
              }
              url.idExercise  = exercises[ex][0];
              exercises[ex][1].url = Object.assign({}, url);
              listExercises.push(exercises[ex][1]);
            }
            //viewModel.set("progress", ((complateCount) /  viewModel.exercises._array.length * 100));
          }
        }
      }
    //  viewModel.set("exercisesCount",  viewModel.exercises.length);
    // viewModel.set("fullTime", (fullTimes/60).toFixed(2)  + "");


      var isComplate = true;
      if(needUserDay == [] || needUserDay == null || typeof needUserDay.isComplate == "undefined" || needUserDay.isComplate == false){
        isComplate = false;
      }

   var exerciseData = {
      countExercise: listExercises.length,
      countComplateExercise: complateCount,
      timeWorkout:(fullTimes/60).toFixed(2),
      listExercises:listExercises,
      isComplate: isComplate,
    }
    return exerciseData;
  }
