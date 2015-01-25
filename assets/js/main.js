/**
 * Game bootstrap
 *
 */

/* globals AudioPlayer, createjs, leap_container, game_container */

$(function () {
  window.stage = new createjs.Stage("stage");

  var logo = logo_container();
  stage.addChild(logo);
  logo.addEventListener("click", function () {
  logo.visible = false;

  var PHYSICS;

  var game = game_container();
  stage.addChild(game);

    var flag = true;
    new AudioPlayer([
        "assets/sounds/bgm.webm",
        "assets/sounds/pop.webm",
        "assets/sounds/hop.webm",
        "assets/sounds/money.webm",
        "assets/sounds/cheer.webm",
        //"assets/sounds/doorchime.webm"
    ]).promise.then(function (sounds) {

      window.physicsDone(function(physics){
        PHYSICS = physics;
        var leftHand = physics.addObject(window.templates.leftHand);
        var rightHand = physics.addObject(window.templates.rightHand);
        var handCallback = function(physicsObject){
          return function(hand){
            physicsObject.pos({x: hand.x, y: hand.y});
            physicsObject.angle(hand.rotation);
          };
        };
        console.log('here');
        // load leap motion controller
        var leap = leap_container(function () {
          // focus
          if (flag) {
            flag = false;
            sounds.pop.start(0);
            sounds.bgm.start(2);
          }
        }, function () {/*blur*/},
        handCallback(leftHand), //on left hand move
        handCallback(rightHand) // on right hand move
        );
        stage.addChild(leap);

        //jk追加
        var jk = physics.addObject(window.templates.jk);
        //障害物追加
        var hazards = [];
        for(var i in window.templates.hazard){
          hazards.push(physics.addObject(window.templates.hazard[i]));
        }

        var exitMask = true;

        // 30 フレームおきに描画更新
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", function () {

          var jkVisual = jk.GetUserData();

          if(exitMask && hole.x <= jkVisual.x && hole.y <= jkVisual.y){
            exitMask = false;
            physics.removeObject(jk);
            jk = physics.addObject(window.templates.jk);
            $.get('http://jk.appcloud.info/showcase/showcase.html?data={"type":"add","jk_id":1,"score":8123,"date":"Sun Jan 25 2015 16:21:22 GMT+0900 (JST)"}');
            exitMask = true;
          }

          PHYSICS.notifyTick();
          stage.update();
        });
    });
  });
});
});
