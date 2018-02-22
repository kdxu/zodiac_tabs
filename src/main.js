chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    setFavicon(tabId, tab.url, ((href, color) => {
      const err = chrome.runtime.lastError;
      if(!err){
        chrome.tabs.sendMessage(tabId, {href: href, color: color});
      }}));
  }
});

function setFavicon(tabId, url, callback){
  var host = new URL(url).host;
  var index = tabId % 12;
  var color = "black";
  var key = "zodiac-tab-color-of" + host;
  var href;
  chrome.storage.local.get(key, (items) => {
    if (!items[key]){
      color = '#'+Math.floor(Math.random()*16777215).toString(16);
      href = chrome.extension.getURL('assets/' + index + '.ico');
      chrome.storage.local.set({[key]: {color: color, href: href}});
    }else{
      color = items[key].color;
      href = items[key].href;
    }
    });
  chrome.tabs.executeScript(tabId, {
    file: './src/inject.js'
  }, function(){ callback(href, color); });
}
