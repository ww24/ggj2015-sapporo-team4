(function(window){
  window.physicsDone = function(fn){
    var p = require('./physics');
    p(fn);
  };
  window.physicsObject_templates = require('./objects');
})(window);
