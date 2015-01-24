var JKUtils = function(){};

JKUtils.proxy = function proxy(fn, context){
  var proxy = function(){
    return fn.apply(context, arguments);
  };
  return proxy;
};

module.exports = JKUtils;
