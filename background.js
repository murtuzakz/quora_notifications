function include(filename, onload) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (script.readyState) {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                script.onreadystatechange = null;                                                  
                onload();
            }
        } 
        else {
            onload();          
        }
    };
    head.appendChild(script);
}

alert("will always show this");
var notifications;
chrome.extension.onMessage.addListener(function (request) {
  // var newURL = "background.html";
  // var tabId = chrome.tabs.create({ url: newURL},function(tab){
    // tabId = tab.id;
    var data = "";
    notifications = request;
    for (var topic in notifications){
      if (notifications.hasOwnProperty(topic)) {
        for(note in notifications[topic]){
          data += '<div>'+note+'</div>';
        }
      }
    }
    alert(data);
    document.body.innerText = "hello";
    // chrome.tabs.onUpdated.addListener(function(tId, changeInfo, tab) {
      // if (tId === tabId && changeInfo.status === 'complete') {
          // document.body.innerText = "God _/\_";
        // chrome.tabs.executeScript(tabId, {
        //   code: 'document.body.innerText = "hello";'
        // });
      // }
      // if (tId === tabId && changeInfo.status === 'complete') {
      //   alert("innertext: " + document.body.innerText);
      //   chrome.tabs.executeScript(tabId, {
      //     code: 'document.body.innerText = "hello";'
      //   });
      // }
    // });  
  // });
  
});
