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
  objects.push(left);
  objects.push(right);

  for(var i = 0; i < 12; i++){
    objects.push({
      src: "stop",
      pos: {
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        w: 0,
        h: 0,
        angle: 0
      },
      fixture: "wall",
      shape: "box",
      type: "b2_staticBody"
    });
  }

})();
module.exports = objects;
