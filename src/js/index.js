(function(window){
  window.onload = function(){
    var JKPhysics = require('./jk_physics');
    new JKPhysics('#gameCanvas')
        .init()
        .start();
  };
})(window);
