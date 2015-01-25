(function(window){
  window.onload = function(){
    require('./physics')(function(physics){
      //壁とか
      var presetObjects = require('./objects');
      for(var key in presetObjects){
        physics.addObject(presetObjects[key]);
      }

      var jkTemplate = {
        src: "cat",
        pos: {
          x: 300,
          y: 100,
          w: 0,
          h: 0,
          angle: 0
        },
        fixture: "jk",
        type: "b2_dynamicBody",
        shape: "box" //or positions
      };
      var jk = physics.addObject(jkTemplate);

      var handTemplate = {
        src: "cat",
        pos: {
          x: 100,
          y: 100,
          w: 0,
          h: 0,
          angle: 0
        },
        fixture: "hand",
        type: "b2_staticBody",
        shape: "box"
      };
      var hand = physics.addObject(handTemplate);

      physics.setHands(hand, hand);
      physics.setCharacter(jk);

      document.addEventListener('mousemove', function(e){
        var pos = {x: e.clientX , y: e.clientY};
        hand.pos(pos);
      });

      //更新
      createjs.Ticker.addEventListener('tick', function(){
        physics.notifyTick();
        var jkPos = jk.pos();
        if(jkPos.y < -100 || jkPos.y > 1000){
          alert('jkがログアウトしました');
          physics.removeObject(jk);
          jk = physics.addObject(jkTemplate);
        }

      });

    });
  };
})(window);
