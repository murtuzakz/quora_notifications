notifications = {}
notifications_answers = {}
notification_follows = []
notification_count = parseInt($(".count").first().html());
uncategorised = []
count = 0;
var animateFn = function () {
	if ( count < notification_count ) {
		setTimeout(function(){
			$("body").animate({ scrollTop: $(document).height() }, {
			complete: function () {
				// count -= 15;
				count = $('div.pagedlist_item li.unseen .notification_text').length
				animateFn();
		  }
		});	
		}, 200)		
	} else {
		scrape();
	}
}

function isEmpty(object){
   for(var key in object) {
      if (object.hasOwnProperty(key)) {
         return false;
      }
   }
   return true;
}


function scrape() {
	$("body").animate({ scrollTop: 0 }, "slow");
	$('div.pagedlist_item li.unseen .notification_text').each(function(){
		a_tags = $(this).find("a");
		if($(a_tags[0]).attr('arg') === undefined){
			if( $(a_tags[1]).attr('arg') === undefined ){
				uncategorised.push(a_tags[1].href)
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
				else if(obj.hasOwnProperty("uid")){
					follow = a_tags[1].href.split("http://www.quora.com/")[1];
					notification_follows.push( follow );
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
				topic = topic.split("/answer")[0]
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
	if(!isEmpty(notifications)){
		data += "<ul class='extension'> QUESTIONS :::";
		for (var topic in notifications){
	    if (notifications.hasOwnProperty(topic)) {
	    	var list_obj = notifications[topic];
	    	data += '<li class="extension"><a href=' + "http://www.quora.com/" + topic + '>' + topic + "</a>" + " (" + list_obj.length + ") ";
	    	data += '<span class="extension" onclick=' + 'notification_killer("' + list_obj + '")></span></li>'
	    }
	  }
	  data += "</ul>";
	}

  if(!isEmpty(notifications_answers)){
	  data += "<br/><br/><br/><br/>"
	  data += "<ul class='extension'> ANSWERS :::";
		
		for (var topic in notifications_answers){
	    if (notifications_answers.hasOwnProperty(topic)) {
	    	var list_obj = notifications_answers[topic];
	    	data += '<li class="extension"><a href=' + "http://www.quora.com/" + topic + '>' + topic + "</a>" + '  (' + list_obj.length + ')';
	    	data += '<span class="extension" onclick=' + 'notification_killer("' + list_obj + '")></span></li><br/>'
	    }	    
	  }
	  data += "</ul>";
	}
  if(!isEmpty(notification_follows)){
	  data += "<br/><br/>"
	  data += "<ul class='extension'> Follows :::";
		data += '<li class="extension"> Followers (' + notification_follows.length + ')';
		data += '<span class="extension" onclick=' + 'notification_killer("' + notification_follows + '")></span></li>'
	  data += "</ul>";
	}
	
  if(uncategorised.length > 0){
	  data += "<br/><br/>"
	  data += "<ul class='extension'> Uncategorised ";
		data += '(' + uncategorised.length + ')';
		data += '<span class="extension" onclick=' + 'notification_killer("' + uncategorised + '")></span>'
	  data += "</ul>";
	}

  document.head.innerHTML += style;
  $("div .right_col_inner").removeClass('fixable_fixed');
  $("div .right_col_inner").html(data);
  $.getScript(chrome.extension.getURL("killer.js"));
}

