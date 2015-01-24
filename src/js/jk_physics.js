var JKPhysics = function(canvas){
  var box2d = require('box2dweb-commonjs');
  var Box2D = box2d.Box2D;

  var createBox2dWorld = function(config){
    var gravity = new Box2D.Common.Math.b2Vec2(0, config.gravity);
    return new Box2D.Dynamics.b2World(gravity, true);
  };

  this.init = function(config){

    config = config || {gravity: 15};

    //ステージ生成
    var canvasElement = document.getElementById(canvas);
    if(!canvasElement){
      throw new Error("canvas not found " + canvas);
    }

    this.stage = new createjs.Stage(canvasElement);

    //box2d初期化
    this.world = createBox2dWorld(config);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    return this;
  };

  this.addDynamics = function(dynamics){
    this.stage.addChild(dynamics.visual);
    return this.world.CreateBody(dynamics.bodyDef);
  };

  this.start = function(){
    var _this = this;
    createjs.Ticker.addEventListener("tick", function(){

      var body = _this.world.GetBodyList();
      var myObject = body.GetUserData();
      if (myObject) {
        var position = body.GetPosition();
        myObject.x = position.x;
        myObject.y = position.y;
        myObject.rotation = body.GetAngle() / createjs.Matrix2D.DEG_TO_RAD;
      }

      _this.tickCallback && _this.tickCallback();
      _this.world.Step(1 / 60, 10, 10);
      _this.stage.update();
    });
    return this;
  };

  this.tick = function(callback){
    this.tickCallback = callback;
  };
};

module.exports = JKPhysics;
