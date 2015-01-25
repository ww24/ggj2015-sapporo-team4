var fixtures = {
    "hand": {
      "density": 20,
      "friction": 0.5,
      "restitution": 0
    },
    "jk": {
      "density": 10,
      "friction": 0.5,
      "restitution": 1.2
    },
    "hazard": {
      "density": 1,
      "friction": 0.5,
      "restitution": 0
    },
    "wall": {
      "density": 1,
      "friction": 0.5,
      "restitution": 0
    }
};

var builder = require('./fixture_builder');
var map = _.transform(fixtures, function(result, val, key){
  result[key] = builder(val);
});

module.exports = function(name){ return map[name]; };
