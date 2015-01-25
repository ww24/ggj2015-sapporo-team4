var collected_jk = {
  "jk_id":0,
  "score":10214,
  "titles":[
    0,3,4
  ],
  "date":new Date()
};

var collected_jks = [
  collected_jk,
  collected_jk,
  collected_jk
];

var parsed = queryString.parse(location.search);

try {
  query = JSON.parse(parsed["data"]);
}
catch(e) {
  query = {};
}

if(query["type"] == "add"){
  addJK(query["jk"]);
}

function addJK(jk){
  if(verifyJK() == false){
    alert("JK error");
    return;
  }

  var jks = JSON.parse(localStorage.getItem("jks"));
  jks.push(jk);
  localStorage.setItem("jks", JSON.stringify(jks));
}

function verifyJK(jk){
  if(
      jk["jk_id"] == undefined ||
      jk["score"] == undefined ||
      jk["titles"] == undefined ||
      jk["date"] == undefined){
    return false;
  }
  return jk;
}

jQuery(document).ready(function(){
  var shelf_num = Math.ceil(collected_jks.length / 6);
  var jk_id = 0;

  for(var i = 0; i < shelf_num; i++){
    var shelf = jQuery("#shelf-source").clone(true);
    shelf.css("display","block");
    jQuery("#showcase").append(shelf);
    e=shelf;
    for(var j = 0; j < 6; j++){
      if(i*6+j >= collected_jks.length){
        break;
      }
      var box = shelf.find(".box"+(j+1)+" > div");
      box.css("display", "block");

      box.find(".jk-img").src = "replace:collected_jk.png";
      //box.find(".jk-img").attr("src", "replace:collected_jk.png");
      box.find(".data").text("replace:collected_jk.data");
      //data-hoge　使おうかなぁ・・・


      jk_id++;
    }
  }

	jQuery('#showcase').slick({
    onAfterChange:function(e){
      jQuery("#page-num").text(e.currentSlide+1);
    }
	});

  jQuery("#overlay").click(function(e){
    if(e.target.id == "overlay") {
      hideOverlay();
    }
  });

  jQuery(document).click(function(e){
    var target = e.target;
    while(target != null){
      if(target.classList.contains("box")){
        showOverlay(target);
        break;
      }
      target = target.parentElement;
    }
  });

  setShelfMargin();

  $(window).resize(function(){
    setShelfMargin();
  });

});

function setShelfMargin(){
  // MUST: Call it when window size changed
  var images = jQuery(".shelf > img");
  var margin_left = ($(".shelf").width() - images.width() )/2;

  // It also neads for box-container 
  var img_width = images.width();
  var img_height = images.height();

  var container = jQuery(".box-container");
  container.css("width", img_width);
  container.css("height", img_height);
  container.css("top", -img_height);
  
//一緒のコンテナーに入れて、コンテナーをposition:relative
// imgとbox-containerをposition:absolute;にしたほうが楽だったなぁ・・・。
  if( margin_left < 0){
    images.css("margin-left", margin_left);
    container.css("margin-left", margin_left);
  }
  else{
    images.css("margin-left", "auto");
    container.css("margin-left", "auto");
  }

}

function hideOverlay(){
  jQuery("#overlay").css("display","none");
}
function showOverlay(target){
  target = jQuery(target)
  var text = target.find(".data").text();
  if(text == ""){
    return;
  }
  jQuery("#overlay").css("display","block");

  jQuery("#overlay #jk-img img").attr("src", target.find("img").attr("src"));
}


var titles = {
  0:{"name":"称号の説明"},
  1:{"name":"称号の説明"},
  2:{"name":"称号の説明"},
  3:{"name":"称号の説明"},
};

var jks = {
  0:{"name":"jk-name"},
  1:{"name":"jk-name"},
  2:{"name":"jk-name"},
  3:{"name":"jk-name"},
};


function get_jk_name(jk_id, score){
  var file_name = "images/" + jk_id + "-";
  if(score < 10000){
    file_name += "C";
  }
  else if(score < 30000){
    file_name += "B";
  }
  else {
    file_name += "C";
  }
  file_name += ".png";

  return file_name;
};

var collected_jk = {
  "jk_id":0,
  "score":10214,
  "titles":[
    0,3,4
  ],
  "date":new Date()
};

var collected_jks = [
  collected_jk,
  collected_jk,
  collected_jk
];


file_name = "[id]-[score_rank].png"
