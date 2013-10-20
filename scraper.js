notifications = {}
notifications_answers = {}
count = parseInt($(".count").first().html());
var animateFn = function () {
	if ( count > 0 ) {
		setTimeout(function(){
			$("body").animate({ scrollTop: $(document).height() }, {
			complete: function () {
				count -= 15;
				animateFn();
		  }
		});	
		}, 100)
		
	} else {
		scrape();
	}
}
function scrape() {
	$("body").animate({ scrollTop: 0 }, "slow");
	$('div.pagedlist_item li.unseen .notification_text').each(function(){
		a_tags = $(this).find("a");
		if($(a_tags[0]).attr('arg') === undefined){
			if( $(a_tags[1]).attr('arg') === undefined ){
			}
			else{
				obj = eval("(" + $(a_tags[1]).attr('arg') + ")");
				if(obj.hasOwnProperty("aid")){
					topic = a_tags[1].href.split("http://www.quora.com/")[1].split("?")[0];
					topic = topic.split("/answer")[0]
				  if( notifications_answers[topic] === undefined ){
				 	 notifications_answers[topic] = [];
				  }
				  note = a_tags[1].href.split("http://www.quora.com/")[1];
				  notifications_answers[topic].push(note);
				}
			}
		}
		else{
			if($(a_tags[0]).attr('arg')){
				obj0 = eval("(" + $(a_tags[0]).attr('arg') + ")");
			}
			if($(a_tags[1]).attr('arg')){
				obj1 = eval("(" + $(a_tags[1]).attr('arg') + ")");
			}
			if(obj0.hasOwnProperty("qid")){
			  topic = a_tags[1].href.split("http://www.quora.com/")[1].split("?")[0];
			  if( notifications[topic] === undefined ){
			 	 notifications[topic] = [];
			  }
			  note = a_tags[0].href.split("http://www.quora.com/")[1];
			  notifications[topic].push(note);
			}else if(obj0.hasOwnProperty("aid")){
				topic = a_tags[0].href.split("http://www.quora.com/")[1].split("?")[0];
			  if( notifications_answers[topic] === undefined ){
			 	 notifications_answers[topic] = [];
			  }
			  note = a_tags[0].href.split("http://www.quora.com/")[1];
			  notifications_answers[topic].push(note);
			}
		}
	});
	build_web_page();
}

animateFn();

var style = "<style type='text/css'>\
li.extension {color:blue;text-align:center}\
ul.extension {font-size:15px;text-align:center; list-style: none;}\
span.extension {background: url('" + chrome.extension.getURL("cross.png") + "') no-repeat; height: 16px; width:16px; display: inline-block; top: 2px; left: 20px; position:relative;}\
</style>\
"

function build_web_page(){
	data = "";
	data += "<ul class='extension'> QUESTIONS :::";
	for (var topic in notifications){
    if (notifications.hasOwnProperty(topic)) {
    	var list_obj = notifications[topic];
    	data += '<li class="extension">' + topic +'  (' + list_obj.length + ')';
    	data += '<span class="extension" onclick=' + 'notification_killer("' + list_obj + '")></span></li>'
    }
  }
  data += "</ul>";
  data += "<br/><br/><br/><br/>"
  data += "<ul> ANSWERS :::";
	
	for (var topic in notifications_answers){
    if (notifications_answers.hasOwnProperty(topic)) {
    	var list_obj = notifications_answers[topic];
    	data += '<li>'+ topic + '  (' + list_obj.length + ')';
    	data += '<span onclick=' + 'notification_killer("' + list_obj + '")></span></li>'
    }
    
  }
  data += "</ul>";
  document.head.innerHTML += style;
  $("div .right_col_inner").html(data);
  // document.body.innerHTML = data;
  $.getScript(chrome.extension.getURL("killer.js"));
}