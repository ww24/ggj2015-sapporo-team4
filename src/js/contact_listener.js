module.exports = function(o1, o2, fn){

  this.BeginContact = function(contact){
    var a = contact.GetFixtureA().GetBody();
    var b = contact.GetFixtureB().GetBody();
    if(a && b && a === o1 && b === o2){
      fn(a,b);
    }
  };
  this.EndContact = function(contact){};
  this.PostSolve = function(contact, impulse){};
  this.PreSolve = function(contact, oldManifold){};
};
