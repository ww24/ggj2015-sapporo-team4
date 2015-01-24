/**
 * LeapMotion Controller
 *
 */
/* globals Leap */
/* exported leap_controller */

function leap_controller(f, callback) {
  var controller = Leap.loop(function (frame) {
    frame.hands.forEach(function (hand) {
      f(hand.type, hand.screenPosition(), hand.roll());
    });
  }).use("screenPosition", {scale: 0.3});

  controller.addListener("deviceAttached", function (e) {
    callback && callback("attached", e);
  });
  controller.addListener("deviceRemoved", function (e) {
    callback && callback("removed", e);
  });
}
