// var object = {
//   src: "",
//   pos: {
//     x: 0,
//     y: 0,
//     w:, 0,
//     h:, 0
//     angle: 0
//   },
//   fixture: "",
//   type: "",
//   shape: "" //or positions
// };

var fixtures = require('./fixtures');

var box2d = require('box2dweb-commonjs');
var b2Body = box2d.Box2D.Dynamics.b2Body;
var b2BodyDef = box2d.Box2D.Dynamics.b2BodyDef;
var b2PolygonShape = box2d.b2PolygonShape;

module.exports = function(images, world, scale){
  return function(template){
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body[template.type];
    bodyDef.position.Set(template.pos.x / scale, template.pos.y / scale);

    if(template.src){
      (function(){
        var img = images(template.src);
        var bitmap = new createjs.Bitmap(img);
        bitmap.regX = img.width / 2;
        bitmap.regY = img.height / 2;
        template.pos.w = img.width;
        template.pos.h = img.height;
        bodyDef.userData = bitmap;
      })();
    }

    var fixture = (function(){
      var fixture = fixtures(template.fixture);
      fixture.shape = new b2PolygonShape();
      if(template.shape == 'box'){
        fixture.shape.SetAsBox(template.pos.w / 2 / scale, template.pos.h /2 / scale);
      }else if(template.shape == 'circle'){
        fixture.shape.SetAsCircle(template.pos.w * scale, template.pos.h * scale);
      }else{
        fixture.shape.SetAsArray(template.shape);
      }
      return fixture;
    })();


    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixture);
    //body.SetAngle(template.pos.angle);
    //body.SetPosition(_.transform(template.pos, function(result, val, key){
    //  result[key] = val * scale;
    //}));
    return body;
  };
};
