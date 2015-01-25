var contactListener = require('./contact_listener');

module.exports = function(left, right, target){
  var fn = function(hand, target){
    // target.ApplyImpulse({x: 100, y: 100}, hand.GetPosition());
  };
  var leftListener = new contactListener(left, target, fn);
  var rightListener = new contactListener(right, target, fn);

  this.BeginContact = function(contact){
    leftListener.BeginContact(contact);
    rightListener.BeginContact(contact);
  };
  this.EndContact = function(contact){};
  this.PostSolve = function(contact, impulse){};
  this.PreSolve = function(contact, oldManifold){};


};
