/**
 * Game bootstrap
 *
 */
/* globals AudioPlayer, createjs, leap_container, game_container */

$(function () {
  var stage = new createjs.Stage("stage");

  // load containers
  var logo = logo_container();
  var game = game_container();

  stage.addChild(logo);

  logo.addEventListener("click", function () {
    logo.visible = false;

    stage.addChild(game);

    var jk = new createjs.Bitmap("assets/images/chara/c01_3.png");
    jk.x = 100;
    jk.y = 100;
    jk.scaleX = jk.scaleY = 0.3;
    game.addChild(jk);

    var flag = true;
    new AudioPlayer([
        "assets/sounds/bgm.webm",
        "assets/sounds/pop.webm",
        "assets/sounds/hop.webm",
        "assets/sounds/money.webm",
        "assets/sounds/cheer.webm",
        //"assets/sounds/doorchime.webm"
    ]).promise.then(function (sounds) {
      // load leap motion controller
      var leap = leap_container(function () {
        // focus
        if (flag) {
          flag = false;
          sounds.pop.start(0);
          sounds.bgm.start(2);
        }
      }, function () {
        // blur
      });
      stage.addChild(leap);
    });

  });

  // 30 フレームおきに描画更新
  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener("tick", function () {
    stage.update();
  });

});
