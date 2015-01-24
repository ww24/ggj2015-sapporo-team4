/**
 * leap_test.js
 *
 */
/* globals createjs, leap_controller */

window.addEventListener("load", function () {
  var stage = new createjs.Stage("stage");

  var shape_left = new createjs.Shape();
  shape_left.graphics.beginFill("red").drawRect(0, 0, 60, 10);
  shape_left.setBounds(200, 200, 60, 10);
  shape_left.regX = 60 / 2;
  shape_left.regY = 10 / 2;
  stage.addChild(shape_left);

  var graphics = new createjs.Graphics().beginFill("blue").drawRect(0, 0, 60, 10);
  var shape_right = new createjs.Shape(graphics);
  shape_right.setBounds(200, 200, 60, 10);
  shape_right.regX = 60 / 2;
  shape_right.regY = 10 / 2;
  stage.addChild(shape_right);

  stage.update();

  leap_controller(function (type, position, role) {
    var shape = [shape_left, shape_right][{left: 0, right: 1}[type]];
    shape.x = Math.floor(position[0]) - 100;
    shape.y = Math.floor(position[1]) + 100;
    shape.rotation = (360 - role / Math.PI * 180) % 360;
    stage.update();
  }, function (status, info) {
    console.log(status, info);
  });
});
