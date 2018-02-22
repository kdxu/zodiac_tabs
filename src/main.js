chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    setFavicon(tabId, ((href, color) => {
      const err = chrome.runtime.lastError;
      if (err){

      }else {
        chrome.tabs.sendMessage(tabId, {href: href, color: color});
      }}));
  }
});

function setFavicon(tabId, callback){
  var index = tabId % 12;
  var color = '#'+Math.floor(Math.random()*16777215).toString(16);
  var href = chrome.extension.getURL('assets/' + index + '.ico');
  chrome.tabs.executeScript(tabId, {
    file: './src/inject.js'
  }, function(){ callback(href, color); });
}
