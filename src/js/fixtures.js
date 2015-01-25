var fixtures = {
    "hand": {
      "collision": true,
      "density": 1,
      "friction": 0.5,
      "restitution": 0
    },
    "hazard": {
      "collision": true,
      "density": 40,
      "friction": 0.5,
      "restitution": 1.2
    },
    "background": {
      "collision": false,
      "density": 0,
      "friction": 0,
      "restitution": 0
    }
};

var builder = require('./fixture_builder');
var map = _.transform(fixtures, function(result, val, key){
  result[key] = builder(val);
});

module.exports = function(name){ return map[name]; };
