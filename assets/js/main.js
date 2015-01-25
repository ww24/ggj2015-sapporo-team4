/**
 * Game bootstrap
 *
 */
/* globals createjs, leapmotion */

$(function () {
  var stage = new createjs.Stage("stage");

  // load leap motion controller
  var leap = leapmotion();
  stage.addChild(leap);

  var container = new createjs.Container();
  stage.addChild(container);

  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener("tick", function () {
    stage.update();
  });

  var queue = new createjs.LoadQueue();
  $.getJSON("assets/images/stage/manifest.json").done(function (manifest) {
    queue.loadManifest(manifest);
  });
  queue.addEventListener("complete", function () {
    var exit = new createjs.Bitmap(queue.getResult("exit"));
    exit.x = 1700;
    exit.y = 800;
    stage.addChild(exit);

    var hole = new createjs.Bitmap(queue.getResult("hole"));
    hole.x = 1500;
    hole.y = 1000;
    stage.addChild(hole);

    var obj1 = new createjs.Bitmap(queue.getResult("obj1"));
    obj1.x = 1000;
    obj1.y = 800;
    stage.addChild(obj1);

    var obj2 = new createjs.Bitmap(queue.getResult("obj2"));
    obj2.x = 500;
    obj2.y = 400;
    stage.addChild(obj2);

    var obj3 = new createjs.Bitmap(queue.getResult("obj3"));
    obj3.x = 900;
    obj3.y = 100;
    stage.addChild(obj3);

    var sprite_sheet = new createjs.SpriteSheet({
      framerate: 30,
      images: [queue.getResult("money")],
      frames: {
        width: 140,
        height: 120
      },
      animations: {
        sparkle: {
          frames: [0, 1, "sparkle"],
          speed: 0.2
        }
      }
    });
    var money = new createjs.Sprite(sprite_sheet, "sparkle");
    money.x = 300;
    money.y = 800;
    stage.addChild(money);

    var money2 = money.clone();
    money2.x = 1500;
    money2.y = 200;
    stage.addChild(money2);

  });

});
