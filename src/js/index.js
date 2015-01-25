(function(window){
  window.onload = function(){
    require('./physics')(function(physics){
      var object = {
        src: "cat",
        pos: {
          x: 100,
          y: 100,
          w: 0,
          h: 0,
          angle: 0
        },
        fixture: "hazard",
        type: "b2_dynamicBody",
        shape: "box" //or positions
      };
      var c = physics.addObject(object);

      object = {
        src: "cat",
        pos: {
          x: 100,
          y: 100,
          w: 0,
          h: 0,
          angle: 0
        },
        fixture: "hazard",
        // type: "b2_kinematicBody",
         type: "b2_staticBody",
        shape: "box" //or positions
      };
      var hand = physics.addObject(object);

      physics.setHands(hand, hand);
      physics.setCharacter(c);


      var prevPos = null;
      document.addEventListener('mousemove', function(e){
        var pos = {x: e.clientX / 30, y: e.clientY / 30};
        if(prevPos){
          window.v = {x: (pos.x - prevPos.x) * 100 , y: (pos.y - prevPos.y) * 100};
        }
        prevPos = pos;
        hand.SetPosition(pos);
      });

      createjs.Ticker.addEventListener('tick', function(){
        physics.notifyTick();
      });

    });
  };
})(window);
