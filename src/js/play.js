/**
 * Play test
 *
 *
 * beru_bgm_rahu.wav -> bgm.webm
 * JK_rakka.wav -> fall_down.webm
 * kansei.wev -> cheer.webm
 */
/* globals AudioContext, Sound */

(function () {
/*
  var sound = new Sound("src/sound/bgm.webm");
  // .play(time, loop)
  sound.play(0, true).then(function (sound) {
    // 再生から 10 秒後に停止
    sound.stop(10);
  });
*/

  // 複数の音声ファイルを読み込むサンプルコード
  var sounds = [
    "src/sound/bgm.webm",
    "src/sound/fall_down.webm",
    "src/sound/cheer.webm"
  ];
  var promises = sounds.map(function (filename) {
    return new Sound(filename).promise;
  });
  Promise.all(promises).then(function (buffers) {
    var context = new AudioContext();
    var nodes = buffers.map(function (buffer) {
      var source = context.createBufferSource();
      var gain = context.createGain();
      source.buffer = buffer;
      source.connect(gain);
      gain.connect(context.destination);
      return {
        source: source,
        gain: gain
      };
    });

    var audio = {
      bgm: nodes[0],
      fall_down: nodes[1],
      cheer: nodes[2]
    };

    audio.fall_down.source.start();
    audio.bgm.source.start(1);
    audio.cheer.source.start(6);
    audio.bgm.source.stop(11);

    // フェードアウト
    audio.bgm.gain.gain.setValueAtTime(1, 6);
    audio.bgm.gain.gain.exponentialRampToValueAtTime(0.0001, 11);

  });
})();
