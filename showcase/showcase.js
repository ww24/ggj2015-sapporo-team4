var collected_jk = {
  "jk_id":1,
  "score":10214,
  "titles":[

  ],
  "date":new Date()
};

/*
   http://jk.appcloud.info/showcase/showcase.html?data={"type":"add","jk_id":1,"score":8123,"date":"Sun Jan 25 2015 16:21:22 GMT+0900 (JST)"}
*/

var parsed = queryString.parse(location.search);

try {
  query = JSON.parse(parsed["data"]);
}
catch(e) {
  query = {};
}

if(query["type"] == "add"){
  addJK(query);
}

function addJK(jk){
  if(jk == undefined || !verifyJK(jk)){
    alert("JK error");
    return;
  }

  var jks = JSON.parse(localStorage.getItem("jks"));
  if(jks == null){
    jks = [];
  }
  jks.push(jk);
  localStorage.setItem("jks", JSON.stringify(jks));
}

function verifyJK(jk){
  if(jk["jk_id"] == undefined || jk["score"] == undefined || jk["date"] == undefined){
    return false;
  }
  return true;
}

jQuery(document).ready(function(){
  var collected_jks = JSON.parse(localStorage.getItem("jks"));
  if(collected_jks == null){
    collected_jks = [];
  }

  var shelf_num = Math.max(1, Math.ceil(collected_jks.length / 6));
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
      var jk = collected_jks[jk_id];

      box.css("display", "block");

      box.find(".jk-img").src = "replace:collected_jk.png";
      box.find(".jk-img").attr("src", get_jk_img(jk));
      box.find(".data").text(JSON.stringify(jk));
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
  else{
    var jk = JSON.parse(text);
  }
  jQuery("#overlay").css("display","block");

  jQuery("#overlay #jk-img img").attr("src", target.find("img").attr("src"));
  jQuery("#overlay #jk-name").text(get_jk_name(jk));
  
  jQuery("#overlay #jk-date").text(get_jk_date(jk));

  jQuery("#overlay #jk-score").text(get_jk_score(jk));

  var title = jQuery("#overlay #jk-title");
  var titles = get_jk_titles(jk);
  for(var i = 0; i < titles.length; i++){
    var li = jQuery("<li />");
    li.text(titles[i]);
    title.append(li);
  }
}


var titles = {
  0:{"name":"称号の説明"},
  1:{"name":"称号の説明"},
  2:{"name":"称号の説明"},
  3:{"name":"称号の説明"},
  4:{"name":"称号の説明"},
  5:{"name":"称号の説明"},
  6:{"name":"称号の説明"},
  7:{"name":"称号の説明"},
};


function get_jk_titles(jk){
  var ret_titles = [];
  for(var i = 0; i < jk["titles"].length; i++){
    var title = jk["titles"][i];
    ret_titles.push(titles[title]["name"]);
  }
  return ret_titles;
}

function get_jk_score(jk){
  return jk["score"];
}

function get_jk_date(jk){
  var date = new Date(jk["date"]);

  y = date.getFullYear();
  m = date.getMonth()+1;
  d = date.getDate();
  return y + "/" + m + "/" + d 
}

function get_jk_name(jk){
  return jks[jk["jk_id"]]["name"];
}

function get_jk_img(jk){
  var jk_id = jk["jk_id"];
  var score = jk["score"];
  if(String(jk_id).length == 1){
    jk_id = "0" + jk_id;
  }
  var file_name = "images/chara/c" + jk_id + "_";
  if(score < 5000){
    file_name += "1";
  }
  else if(score < 10000){
    file_name += "2";
  }
  else {
    file_name += "3";
  }
  file_name += ".png";

  return file_name;

};
/*
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
*/

