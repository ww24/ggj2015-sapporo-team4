/**
 * Game bootstrap
 *
 */
/* globals AudioPlayer, createjs, leap_container, game_container */

$(function () {
  var stage = new createjs.Stage("stage");

  var game = game_container();
  stage.addChild(game);

  new AudioPlayer([
      "assets/sounds/bgm.webm",
      "assets/sounds/fall_down.webm",
      "assets/sounds/cheer.webm"
  ]).promise.then(function (sounds) {
    // load leap motion controller
    var leap = leap_container(function () {
      // focus
      sounds.bgm.start(0);
    }, function () {
      // blur (仮)
      sounds.bgm.fadeOut(5);
    });
    stage.addChild(leap);
  });

  // 30 フレームおきに描画更新
  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener("tick", function () {
    stage.update();
  });

});
