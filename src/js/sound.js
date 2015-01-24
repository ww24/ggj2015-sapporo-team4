/**
 * sound player
 *
 */
/* globals AudioContext */

if (! window.AudioContext) {
  alert("お使いのブラウザは対応してません。");
}

function Sound(url) {
  var sound = this;

  this.ctx = new AudioContext();
  this.promise = Sound.loadSoundFile(url).then(function (res) {
    return new Promise(function (resolve, reject) {
      sound.ctx.decodeAudioData(res, resolve, reject);
    });
  });
}

Sound.loadSoundFile = function (url) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open("get", url, true);
    req.responseType = "arraybuffer";
    req.onload = function () {
      resolve(req.response);
    };
    req.onerror = reject;
    req.send();
  });
};

Sound.prototype.play = function (time, loop) {
  var sound = this;
  return this.promise.then(function (buff) {
    sound.ctx = new AudioContext();
    var source = sound.ctx.createBufferSource();
    var gain = sound.ctx.createGain();
    source.buffer = buff;
    source.loop = !! loop;
    source.connect(gain);
    gain.connect(sound.ctx.destination);
    source.start(time || 0);
    return {
      source: source,
      gain: gain
    };
  });
};
