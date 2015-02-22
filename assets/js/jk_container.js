/**
 * JK
 *
 */
/* globals Box2D, createjs */
/* exported jk_container */

function jk_container() {
  var world = this;

  var container = new createjs.Container();

  var queue = new createjs.LoadQueue();
  $.getJSON("assets/images/chara/manifest.json").done(function (manifest) {
    queue.loadManifest(manifest);
  });

  var jk_body;

  queue.addEventListener("complete", function () {
    var jk = new createjs.Bitmap(queue.getResult("c01_3"));
    jk.x = 100;
    jk.y = 100;
    jk.scaleX = jk.scaleY = 0.3;
    var w = jk.image.width * jk.scaleX;
    var h = jk.image.height * jk.scaleY;
    jk.regX = w / 2;
    jk.regY = h / 2;
    container.addChild(jk);

    var jk_body_def = new Box2D.Dynamics.b2BodyDef();
    jk_body_def.position.Set(jk.x * world.SCALE, jk.y * world.SCALE);
    jk_body_def.type = Box2D.Dynamics.b2Body.b2_staticBody;
    jk_body_def.userData = jk;

    var jk_fixture = new Box2D.Dynamics.b2FixtureDef();
    jk_fixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    jk_fixture.shape.SetAsBox(jk.regX * world.SCALE, jk.regY * world.SCALE);

    jk_body = world.CreateBody(jk_body_def);
    jk_body.CreateFixture(jk_fixture);
  });

  jk_container.start = function () {
    jk_body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody);
  };

  return container;
}
