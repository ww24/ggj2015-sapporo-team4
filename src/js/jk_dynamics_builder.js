var JKImageLoader = require('./jk_imageloader');
var box2d = require('box2dweb-commonjs');
var Box2D = box2d.Box2D;

var bodyDefBuilder = function(x, y, bodyType){
    var bodyDef = new (Box2D.Dynamics.b2BodyDef)();
    bodyDef.position.Set(x, y);
    bodyDef.type = bodyType;
    return bodyDef;
};

var visualBuilders = {};

var createVisualBuilder = function(fn){
  return function(bodyDef){
      var v = fn();
      bodyDef.userData = v;
      return v;
  };
};

visualBuilders.ellipse = function(w, h, image){
  return createVisualBuilder(function(){
    var ellipse = new createjs.Bitmap(image);
    ellipse.regX = w / 2;
    ellipse.regY = h / 2;
    return ellipse;
  });
};

visualBuilders.rect = visualBuilders.ellipse;


var JKDynamicsBuilder = function(){};



JKDynamicsBuilder.build = function(figureType, asset, onCreate){

  var imageLoader;

  if(asset instanceof JKImageLoader){
    imageLoader = asset;
  }else if("string" === typeof asset){
    imageLoader = JKImageLoader.fromImagePath([asset]);
  }

  imageLoader.handleFileComplete(function(event){
    var img = event.result;
    var type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    var bodyDef = bodyDefBuilder(100,100, type);
    var visual = visualBuilders[figureType](img.width, img.height, img)(bodyDef);
    onCreate(
      {
        visual: visual,
        bodyDef: bodyDef
    });
  }).start();

};

module.exports = JKDynamicsBuilder;
