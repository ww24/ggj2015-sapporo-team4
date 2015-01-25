/**
 * Tutorial Container
 *
 */
/* globals createjs */
/* exported tutorial_container */

function tutorial_container() {

  var container = new createjs.Container();

  var queue = new createjs.LoadQueue();
  $.getJSON("assets/images/tutorial/manifest.json").done(function (manifest) {
    queue.loadManifest(manifest);
  });

  queue.addEventListener("complete", function () {
    var tuto = new createjs.Bitmap(queue.getResult("tuto"));
    tuto.x = 0;
    tuto.y = 0;
    container.addChild(tuto);

    var arrow = new createjs.Bitmap(queue.getResult("arrow"));
    arrow.x = 533;
    arrow.y = 650;
    container.addChild(arrow);
  });

  return container;
}
