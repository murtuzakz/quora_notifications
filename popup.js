chrome.tabs.query({"url": "http://www.quora.com/notifications"}, function(tabs){
})
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "notification_relay");
  port.onMessage.addListener(function(msg) {
	alert(msg);
  });
});

