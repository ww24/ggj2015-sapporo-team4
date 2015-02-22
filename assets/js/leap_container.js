/**
 * Leap Motion Controller
 *
 */
/* globals Leap, Box2D, createjs, tutorial_container */
/* exported leap_container */

function leap_container(focus, blur) {
  var world = this;

  var tutorial = tutorial_container();

  var container = new createjs.Container();

  var queue = new createjs.LoadQueue();
  $.getJSON("assets/images/hand/manifest.json").done(function (manifest) {
    queue.loadManifest(manifest);
  });

  queue.addEventListener("complete", function () {
    var hands = {
      left: null,
      right: null
    };

    function Hand(url) {
      this.initialize(url);
      this.regX = 444;
      this.regY = 350;
      this.scaleX = this.scaleY = 0.3;
      this.alpha = 0.8;
    }
    Hand.prototype = new createjs.Bitmap();

    hands.left = new Hand(queue.getResult("hand3_l"));
    container.addChild(hands.left);

    hands.right = new Hand(queue.getResult("hand3_r"));
    container.addChild(hands.right);

    var hand_bodies = [hands.right, hands.left].map(function (hand) {
      var hand_def = new Box2D.Dynamics.b2BodyDef();
      hand_def.position.Set(hand.x * world.SCALE, hand.y * world.SCALE);
      hand_def.type = Box2D.Dynamics.b2Body.b2_staticBody;
      hand_def.userData = hand;

      var fixture = new Box2D.Dynamics.b2FixtureDef();
      fixture.shape = new Box2D.Collision.Shapes.b2CircleShape(hand.regX * hand.scaleX);

      var body = world.CreateBody(hand_def);
      body.CreateFixture(fixture);

      return body;
    });

    container.addChild(tutorial);

    var active_hand_length = 0;
    Leap.loop(function (frame) {
      if (active_hand_length < 2 && frame.hands.length === 2) {
        focus && focus();
        tutorial.visible = false;
      } else if (active_hand_length === 2 && frame.hands.length < 2) {
        blur && blur();
      }
      active_hand_length = frame.hands.length;

      frame.hands.forEach(function (hand) {
        var type = hand.type;
        var hand_obj = [hands.left, hands.right][{left: 0, right: 1}[type]];

        // position
        var position = hand.screenPosition();
        hand_obj.x = Math.floor(position[0]) + 500;
        hand_obj.y = Math.floor(position[1]) + 1200;

        // rotation (rad -> deg)
        var rotation = (360 - hand.roll() / createjs.Matrix2D.DEG_TO_RAD) % 360;
        var dr = rotation;
        var is_left = type === "left";
        if (is_left) {
          dr = 360 - rotation;
        }
        if (dr >= 270 || dr < 60) {
          rotation += (is_left * 2 - 1) * 40;
          hand_obj.image = queue.getResult("hand1_" + type[0]);
        } else if (dr >= 60 && dr < 140) {
          rotation += (is_left * 2 - 1) * 110;
          hand_obj.image = queue.getResult("hand2_" + type[0]);
        } else {
          rotation += (is_left * 2 - 1) * 180;
          hand_obj.image = queue.getResult("hand3_" + type[0]);
        }
        hand_obj.rotation = rotation % 360;

        // physics
        hand_bodies[+ is_left].SetPosition(hand_obj.x * world.SCALE, hand_obj.y * world.SCALE);
        
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
