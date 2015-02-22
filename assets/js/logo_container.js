/**
 * Logo Contaienr
 *
 */
/* globals createjs */
/* exported logo_container */

function logo_container() {

  var container = new createjs.Container();

  var queue = new createjs.LoadQueue();
  $.getJSON("assets/images/logo/manifest.json").done(function (manifest) {
    queue.loadManifest(manifest);
  });

  queue.addEventListener("complete", function () {
    var logo = new createjs.Bitmap(queue.getResult("logo"));
    logo.x = logo.y = 0;
    container.addChild(logo);
  });

  return container;
}
