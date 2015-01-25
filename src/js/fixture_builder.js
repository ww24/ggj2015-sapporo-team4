var b2FixtureDef = require('box2dweb-commonjs').b2FixtureDef;
module.exports = function(template){
  var fixture = new b2FixtureDef();
  _.merge(fixture, template);
  return fixture;
};
