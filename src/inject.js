chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var href = request.href;
  if(href){
    document.querySelector('link[rel*="icon"]').href = href
    document.querySelector('link[rel*="shortcut icon"]').href = href
  }
});
