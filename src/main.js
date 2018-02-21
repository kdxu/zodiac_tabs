chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    setFavicon(tabId, ((href) => {
      const err = chrome.runtime.lastError;
      if (err){

      }else {
        chrome.tabs.sendMessage(tabId, {href: href});
      }}));
  }
});

function setFavicon(tabId, callback){
  var index = tabId % 12;
  var href = chrome.extension.getURL('assets/' + index + '.ico');
  chrome.tabs.executeScript(tabId, {
    file: './src/inject.js'
  }, function(){ callback(href); });
}
