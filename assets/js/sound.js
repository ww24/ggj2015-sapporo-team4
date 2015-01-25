/**
 * sound player
 *
 */
/* globals AudioContext */
/* exported AudioPlayer */

function Sound(url) {
  var sound = this;

  if (! window.AudioContext) {
    alert("お使いのブラウザは対応してません。");
  }

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

function AudioPlayer(urls) {

  var names = urls.map(function (url) {
    return url.split("/").slice(-1)[0].split(".")[0];
  });

  var promises = urls.map(function (filename) {
    return new Sound(filename).promise;
  });
  this.promise = Promise.all(promises).then(function (buffers) {
    var context = new AudioContext();

    var sounds = {};

    buffers.forEach(function (buffer, index) {
      sounds[names[index]] = {
        source: null,
        gain: null,
        start: function (time) {
          this.source = context.createBufferSource();
          this.gain = context.createGain();
          this.source.buffer = buffer;
          this.source.connect(this.gain);
          this.gain.connect(context.destination);
          this.source.start(time || 0);
        },
        // time 秒後に停止
        fadeOut: function (time) {
          this.gain.gain.setValueAtTime(1, context.currentTime);
          this.gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + time);
          this.source.stop(context.currentTime + time);
        }
      };
    });

    return sounds;
  });
}
