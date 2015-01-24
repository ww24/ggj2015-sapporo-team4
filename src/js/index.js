(function(window){
  window.onload = function(){
    var JKPhysics = require('./jk_physics');
    var JKDynamicsBuilder = require('./jk_dynamics_builder');
    var physics = new JKPhysics('gameCanvas').init();

    JKDynamicsBuilder.build('rect','img/cat.jpg', function(d){
      var cat = physics.addDynamics(d);
      physics.start();

      window.document.addEventListener('mousemove', function(e){
        cat.SetPosition({x: e.clientX, y: e.clientY});
      });
    });
  };
})(window);
