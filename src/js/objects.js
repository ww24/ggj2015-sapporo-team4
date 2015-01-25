var objects = [];

var WALL_WIDTH = 1;

//左右の壁
(function(){
  var canvas = document.getElementById("gameCanvas");
  var left = {
      pos: {
        x: 0,
        y: 0,
        w: WALL_WIDTH,
        h: canvas.height,
        angle: 0
      },
      fixture: "wall",
      shape: "box",
      type: "b2_staticBody"
  };
  var right = {
    pos: {
      x: canvas.width - WALL_WIDTH,
      y: 0,
      w: WALL_WIDTH,
      h: canvas.height,
      angle: 0
    },
    fixture: "wall",
    shape: "box",
    type: "b2_staticBody"
  };
  // var ceil = {
  //   pos: {
  //     x: 1,
  //     y: -50,
  //     w: canvas.width,
  //     h: 1,
  //     angle: 0
  //   },
  //   fixture: "wall",
  //   shape: "box",
  //   type: "b2_staticBody"
  // };

  objects.push(left);
  objects.push(right);
  // objects.push(ceil);
})();
module.exports = objects;
