var JKPhysics = function(canvas){
  var box2d = require('box2dweb-commonjs');
  var Box2D = box2d.Box2D;

  var createBox2dWorld = function(config){
    var gravity = new Box2D.Common.Math.b2Vec2(0, config.gravity);
    this.world = new Box2D.Dynamics.b2World(gravity, true);

  };

  this.init = function(config){

    config = config || {gravity: 15};

    //ステージ生成
    var canvasElement = document.getElementById(canvas);
    this.stage = new createjs.Stage(canvasElement);

    //box2d初期化
    createBox2dWorld(config);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    return this;
  };

  this.start = function(){
    var _this = this;
    createjs.Ticker.addEventListener("tick", function(){
      _this.tickCallback && _this.tickCallback();
      _this.stage.update();
    });
    return this;
  };

  this.tick = function(callback){
    this.tickCallback = callback;
  };
};

module.exports = JKPhysics;
