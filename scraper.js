notifications = {}
count = 60//parseInt($(".count").first().html());
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
		fn2();
	}
}
var fn2 = function () {
	$("body").animate({ scrollTop: 0 }, "slow");
	$('div.pagedlist_item li.unseen .notification_text').each(function(){
		a_tags = $(this).find("a");
		if($(a_tags[0]).attr('arg') === undefined){}
		else{
		  topic = a_tags[1].href.split("http://www.quora.com/")[1].split("?")[0];
		  if( notifications[topic] === undefined ){
		 	 notifications[topic] = [];
		  }
		  note = a_tags[0].href.split("http://www.quora.com/")[1].split("?")[0];
		  notifications[topic].push(note);
		}	
	});
	// chrome.runtime.sendMessage( notifications )
	// update_url();
	build_web_page(notifications);
	//chrome.extension.sendMessage( notifications )
}
animateFn();

function update_url(){
	chrome.tabs.getSelected(function (tab) {
	  var tabUrl = encodeURIComponent(tab.url);
	  var tabTitle = encodeURIComponent(tab.title);
	  chrome.tabs.update(tab.id, {url: "chrome-extensions://test/hello.html"});
	});
}

function build_web_page(notifications_object){
	data = "";
	for (var topic in notifications){
    if (notifications.hasOwnProperty(topic)) {
    	data += "<br/><br/><br/><br/><br/><br/>";
    	var list_obj = notifications[topic];
      for(var i=0; i< list_obj.length; i++){
        data += '<div>'+list_obj[i]+'</div>';
      }
    }
  }
  document.body.innerHTML = data;
}