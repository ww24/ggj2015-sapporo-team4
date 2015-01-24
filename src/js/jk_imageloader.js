var JKImageLoader = function(manifest){
  var utils = require('./jk_utils');

  this.queue = new createjs.LoadQueue();
  this.events = {
    fileComplete: function(){},
    complete: function(){},
  };


  var dispose = function(){
    this.queue = null;
    this.events = null;
  };

  var _handleFileComplete = function(event){
    this.events.fileComplete(event);
  };

  var _complete = function(){
    this.events.complete(this.queue);
    dispose();
  };

  this.start = function(){
    this.queue.addEventListener("fileload", utils.proxy(_handleFileComplete, this));
    this.queue.addEventListener("fileload", utils.proxy(_complete, this));
    this.queue.loadManifest(manifest);
    return this;
  };

  this.handleFileComplete = function(fn){
    this.events.fileComplete = fn;
    return this;
  };

  this.complete = function(fn){
    this.events.complete = fn;
    return this;
  };


};

JKImageLoader.manifest = function(files){
  var manifest = files.map(function(file){
    return {src: file, id: file};
  });
  return manifest;
};

JKImageLoader.fromImagePath = function(files){
  return new JKImageLoader(JKImageLoader.manifest(files));
};


module.exports = JKImageLoader;
