/**
 * Leap Motion Controller
 *
 */
/* globals Leap, createjs */
/* exported leapmotion */

function leapmotion() {

  var container = new createjs.Container();

  var queue = new createjs.LoadQueue();
  $.getJSON("assets/images/hand/manifest.json").done(function (manifest) {
    queue.loadManifest(manifest);
  });

  queue.addEventListener("complete", function () {
    var hands = {
      left: [],
      right: []
    };

    function Hand(url) {
      this.initialize(url);
      this.regX = 444;
      this.regY = 350;
      this.scaleX = this.scaleY = 0.3;
      this.alpha = 0.8;
    }
    Hand.prototype = new createjs.Bitmap();

    hands.left[0] = new Hand(queue.getResult("hand1_l"));
    hands.left[0].x = 720;
    hands.left[0].y = 500;
    container.addChild(hands.left[0]);

    hands.right[0] = new Hand(queue.getResult("hand1_r"));
    hands.right[0].x = 1200;
    hands.right[0].y = 500;
    container.addChild(hands.right[0]);

    hands.left[1] = new Hand(queue.getResult("hand2_l"));
    hands.left[1].visible = false;
    container.addChild(hands.left[1]);

    hands.right[1] = new Hand(queue.getResult("hand2_r"));
    hands.right[1].visible = false;
    container.addChild(hands.right[1]);

    Leap.loop(function (frame) {
      frame.hands.forEach(function (hand) {
        var type = hand.type;
        var position = hand.screenPosition();
        var roll = hand.roll();
        var rotation = (360 - roll / Math.PI * 180) % 360;
        var hand_list = [hands.left, hands.right][{left: 0, right: 1}[type]];

        hand_list.forEach(function (hand, index) {
          hand.x = Math.floor(position[0]) + 500;
          hand.y = Math.floor(position[1]) + 1200;
          hand.rotation = (rotation + index * ((type === "left") * 150 + (type === "right") * 210)) % 360;
        });
        
        if (rotation > 110 && rotation < 250) {
          hand_list[0].visible = false;
          hand_list[1].visible = true;
        } else {
          hand_list[0].visible = true;
          hand_list[1].visible = false;
        }
        
      }, function (status, info) {
        console.log(status, info);
      });
    }).use("screenPosition", {scale: 0.8})
    .addListener("deviceAttached", function (e) {
      console.log("Leap Motion 接続", e);
    })
    .addListener("deviceRemoved", function (e) {
      console.log("Leap Motion 切断", e);
    });
  });

  return container;
}
