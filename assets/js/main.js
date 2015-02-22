/**
 * Game bootstrap
 *
 */
/* globals AudioPlayer, Box2D, createjs, leap_container, game_container, logo_container, jk_container */

$(function () {
  var stage = new createjs.Stage("stage");

  var gravity = new Box2D.Common.Math.b2Vec2(0, 10);
  var world = new Box2D.Dynamics.b2World(gravity, true);
  world.SCALE = 1 / 50;

  // load containers
  var logo = logo_container();
  var game = game_container();
  var jk = jk_container.call(world);

  stage.addChild(logo);

  var audio = new AudioPlayer([
    "assets/sounds/bgm.webm",
    "assets/sounds/pop.webm",
    "assets/sounds/hop.webm",
    "assets/sounds/money.webm",
    "assets/sounds/cheer.webm",
    //"assets/sounds/doorchime.webm"
  ]);

  logo.addEventListener("click", function () {
    logo.visible = false;

    stage.addChild(game);

    stage.addChild(jk);

    audio.promise.then(function (sounds) {
      // load leap motion controller
      var flag = true;
      var leap = leap_container.call(world, function () {
        // focus
        if (flag) {
          flag = false;
          sounds.pop.start(0);
          sounds.bgm.start(3, true);

          jk_container.start();
        }
      }, function () {
        // blur
      });
      stage.addChild(leap);
    });

  });

  // 30 フレームおきに描画更新
  createjs.Ticker.setFPS(30);
  createjs.Ticker.on("tick", function (evt) {
    stage.update();

    world.Step(evt.delta / 1000, 8, 3);
    var body = null;
    for (body = world.GetBodyList(); body !== null; body = body.GetNext()) {
      var obj = body.GetUserData();
      var pos = body.GetPosition();
      if (obj && pos.x && pos.y) {
        obj.x = pos.x / world.SCALE;
        obj.y = pos.y / world.SCALE;
        obj.rotation = body.GetAngle() / createjs.Matrix2D.DEG_TO_RAD;
      }
    }
  });

});
