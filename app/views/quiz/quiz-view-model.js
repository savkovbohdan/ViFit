Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
require("nativescript-dom");
var enums = require("tns-core-modules/ui/enums");
var api = require("../../js/api-firebase-module");
var platform = require("tns-core-modules/platform");
const Button = require("tns-core-modules/ui/button").Button;
screen = platform.screen;
scale = screen.mainScreen.scale;
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    state: 0,
    btn: ["Мужской", "Женский"],
    quastionIndex: 0,
    quastion: "",
    quiz: [
      { quastion: "Выбери пол:", answer: ["Мужской", "Женский"], active: 0, images: ["~/images/svg/man-regular.svg", "~/images/svg/girl-regular.svg"] },
      { quastion: "Выбери уровень подготовки:", answer: ["Высокий", "Средний", "Низкий"], active: 1, images: [["~/images/svg/man-regular.svg", "~/images/svg/man-medium.svg", "~/images/svg/man-bold.svg"], ["~/images/svg/girl-regular.svg", "~/images/svg/girl-medium.svg", "~/images/svg/girl-bold.svg"]] },
      { quastion: "Добавить бег в программу:", answer: ["Нет", "Да"], active: 0 },
      { quastion: "Количество тренировок в неделю:", answer: [1, 2, 3, 4, 5, 6, 7], active: 0, btnType: "number" }
    ],
    answer: [],

    next: function (args) {
      if (viewModel.quastionIndex + 1 < viewModel.quiz.length) {
        el = viewModel.page.getElementsByClassName('active-btn')[0];
        viewModel.answer.push(parseInt(el.quastionIndex));
        viewModel.quastionIndex++;
        viewModel.quizLoad();
      }
      if (viewModel.quastionIndex + 1 == viewModel.quiz.length) {
        viewModel.state = 1;

      }
    },
    finish: () => {
      el = viewModel.page.getElementsByClassName('active-btn')[0];
      viewModel.answer.push(parseInt(el.quastionIndex));
      var data = {
        sex: (viewModel.answer[0] == 0) ? "man" : "girl",
        sportLevel: (viewModel.answer[1] + 1),
        run: (viewModel.answer[2] == 1) ? true : false,
        workoutsWeek: (viewModel.answer[3] + 1),
        quizIsComplate: true
      }
      api.quizComplate(data);
    },
    run: function () {
      api.quizIsComplate();
      viewModel.quizLoad();
    },
    quizLoad: function () {
      setTimeout(function () {
        var p = (viewModel.quastionIndex + 1) / viewModel.quiz.length * 100;
        viewModel.page.getElementsByClassName('progress-bar')[0].update(p);
        viewModel.page.getElementsByClassName('btn-list-qz')[0].removeChildren();
        if (typeof viewModel.quiz[viewModel.quastionIndex] != "undefined") {
          qz = viewModel.quiz[viewModel.quastionIndex];
          viewModel.quastion = qz.quastion;
          for (q in qz.answer) {
            var btn = new Button();
            btn.text = qz.answer[q] + "";
            btn.quastionIndex = q;
            btn.className = "btn-select mt-20";
            if (q == qz.active) {
              btn.classList.add("active-btn");
              el = viewModel.page.getElementsByClassName('run-people')[0];
              if (typeof qz.images != "undefined") {
                if (viewModel.answer.length > 0) {
                  if (viewModel.answer.length == 1)
                    el.src = qz.images[viewModel.answer[0]][q];
                  if (viewModel.answer.length == 2)
                    el.src = qz.images[viewModel.answer[0]][viewModel.answer[1]][q];
                  if (viewModel.answer.length == 3)
                    el.src = qz.images[viewModel.answer[0]][viewModel.answer[1]][viewModel.answer[2]][q];
                } else {
                  el.src = qz.images[q];
                }
              }
              el.animate({
                translate: { x: 300, y: 0 },
                duration: 300,
                curve: enums.AnimationCurve.easeOut
              }).then(() => {

                width = el.getMeasuredWidth() / scale;
                el.animate({
                  translate: { x: (width / 2.5), y: 0 },
                  duration: 700,
                  curve: enums.AnimationCurve.easeOut
                });
              });
            }
            btn.opacity = 0;
            if (typeof qz.btnType != "undefined" && qz.btnType == "number") {
              btn.classList.add("mr-25");
              btn.width = "40";
              viewModel.page.getElementsByClassName('btn-list-qz')[0].addChild(btn);
            }
            else
              viewModel.page.getElementsByClassName('btn-list-qz')[0].addChild(btn);
            btn.on("tap", viewModel.tapQustion);
            btn.animate({
              opacity: 1,
              duration: 1000,
              curve: enums.AnimationCurve.easeOut
            });
          }
        }
      }, 1);
    },
    tapQustion: function (args) {
      qz = viewModel.quiz[viewModel.quastionIndex];
      viewModel.page.runAgainstClasses('btn-select', function (elem) {
        if (elem.classList.contains('active-btn'))
          elem.classList.remove('active-btn');
      });
      args.object.classList.add("active-btn");
      el.animate({
        translate: { x: 300, y: 0 },
        duration: 300,
        curve: enums.AnimationCurve.easeOut
      }).then(function () {
        el = viewModel.page.getElementsByClassName('run-people')[0];
        if (typeof qz.images != "undefined") {
          if (viewModel.answer.length > 0) {
            if (viewModel.answer.length == 1)
              el.src = qz.images[viewModel.answer[0]][args.object.quastionIndex];
            if (viewModel.answer.length == 2)
              el.src = qz.images[viewModel.answer[0]][viewModel.answer[1]][args.object.quastionIndex];
            if (viewModel.answer.length == 3)
              el.src = qz.images[viewModel.answer[0]][viewModel.answer[1]][viewModel.answer[2]][args.object.quastionIndex];
          } else {
            el.src = qz.images[args.object.quastionIndex];
          }
        }
        width = el.getMeasuredWidth() / scale;
        el.animate({
          translate: { x: width / 2.5, y: 0 },
          duration: 700,
          curve: enums.AnimationCurve.easeOut
        })
      })
    }
  });
  return viewModel;
}
module.exports = HomeViewModel;

