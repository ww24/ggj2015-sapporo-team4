var box2d = require('box2dweb-commonjs');
var Box2D = box2d.Box2D;
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var objectBuilderFactory = require('./object_builder');
var handsHitListener = require('./hands_hit_listener')

var CANVAS = 'gameCanvas';
var WORLD_SCALE = 60;
var GRAVITY = 9.8;

var physicsFactory = function(images){

  var world = new Box2D.Dynamics.b2World(new b2Vec2(0, GRAVITY), true);
  var objectBuilder = objectBuilderFactory(images, world, WORLD_SCALE);

  var leftHand = null;
  var rightHand = null;
  var character;


  var canvasElement = document.getElementById(CANVAS);
  if(!canvasElement){
    throw new Error("canvas not found " + CANVAS);
  }

  var stage = new createjs.Stage(canvasElement);

  var wrapBody = function(obj){
    obj.pos = function(param){
      if(param){
        obj.SetPosition({x: param.x / WORLD_SCALE, y: param.y / WORLD_SCALE});
      }
      else{
        var p = obj.GetPosition();
        return {x: p.x * WORLD_SCALE, y: p.y * WORLD_SCALE};
      }
    };

    obj.angle = function(angle){
      if(angle){
        obj.SetAngle(angle);
      }else{
        return obj.GetAngle();
      };
    };
    return obj;
  };


  this.addObject = function(template){
    var obj = objectBuilder(template);
    var userData = obj.GetUserData();
    if(userData){
      stage.addChild(obj.GetUserData());
    }
    return wrapBody(obj);
  };

  this.removeObject = function(obj){
    var userData = obj.GetUserData();
    if(userData){
      stage.removeChild(userData);
    }
    world.DestroyBody(obj);
  };

  this.notifyTick = function(){
    var body = world.GetBodyList();
    while(body){
      var visual = body.GetUserData();
      if (visual) {
        var position = body.GetPosition();
        visual.x = position.x * WORLD_SCALE;
        visual.y = position.y * WORLD_SCALE;
        visual.rotation = body.GetAngle() / createjs.Matrix2D.DEG_TO_RAD;
      }
      body = body.GetNext();
    }
    world.Step(1/60, 10, 10);
    stage.update();
  };

  this.setHands = function(left, right){
    leftHand = left;
    rightHand = right;
  //  world.SetContactListener(new handsHitListener(left, right, character));
  };

  this.setCharacter = function(c){
    character = c;
    //world.SetContactListener(new handsHitListener(leftHand, rightHand, character));
  };


};

var physics = function(fn){
  var queue = new createjs.LoadQueue();
  queue.addEventListener('complete', function(event){
    var images = function(imageId){
      return event.target.getResult(imageId);
    };
    var physics = new physicsFactory(images);
    fn(physics);
  });
  queue.loadManifest('json/manifest.json');
};

module.exports = physics;
