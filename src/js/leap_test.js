/**
 * leap_test.js
 *
 */
/* globals createjs, leap_controller */

window.addEventListener("load", function () {
  var stage = new createjs.Stage("stage");

  function Hand(url) {
    this.initialize(url);
    this.regX = 444;
    this.regY = 350;
    this.scaleX = this.scaleY = 0.2;
    this.alpha = 0.8;
  }
  Hand.prototype = new createjs.Bitmap();

  var hands = {
    left: [],
    right: []
  };

  var queue = new createjs.LoadQueue();
  queue.addEventListener("complete", function () {
    hands.left[0] = new Hand(queue.getResult("hand1_l"));
    hands.left[0].x = 250;
    hands.left[0].y = 200;
    stage.addChild(hands.left[0]);

    hands.right[0] = new Hand(queue.getResult("hand1_r"));
    hands.right[0].x = 550;
    hands.right[0].y = 200;
    stage.addChild(hands.right[0]);

    hands.left[1] = new Hand(queue.getResult("hand2_l"));
    hands.left[1].visible = false;
    stage.addChild(hands.left[1]);

    hands.right[1] = new Hand(queue.getResult("hand2_r"));
    hands.right[1].visible = false;
    stage.addChild(hands.right[1]);

    stage.update();

    leap_controller(function (type, position, role) {
      var rotation = (360 - role / Math.PI * 180) % 360;
      var hand_list = [hands.left, hands.right][{left: 0, right: 1}[type]];
      hand_list.forEach(function (hand, index) {
        hand.x = Math.floor(position[0]) - 100;
        hand.y = Math.floor(position[1]) + 100;
        hand.rotation = (rotation + index * ((type === "left") * 150 + (type === "right") * 210)) % 360;
      });
      if (rotation > 110 && rotation < 250) {
        hand_list[0].visible = false;
        hand_list[1].visible = true;
      } else {
        hand_list[0].visible = true;
        hand_list[1].visible = false;
      }
      stage.update();
    }, function (status, info) {
      console.log(status, info);
    });
  });

  queue.loadManifest([{
    id: "hand1_l",
    src: "src/img/hand1_l.png"
  }, {
    id: "hand1_r",
    src: "src/img/hand1_r.png"
  }, {
    id: "hand2_l",
    src: "src/img/hand2_l.png"
  }, {
    id: "hand2_r",
    src: "src/img/hand2_r.png"
  }]);

});
