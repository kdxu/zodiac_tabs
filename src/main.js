chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    setFavicon(tabId, (() => {
      const err = chrome.runtime.lastError;
      if(!err){
        chrome.tabs.sendMessage(tabId, {tabId: tabId, url: tab.url});
      }}));
  }
});

function setFavicon(tabId, callback){
  chrome.tabs.executeScript(tabId, {
    file: './src/inject.js'
  }, function(){ callback(); });
}
