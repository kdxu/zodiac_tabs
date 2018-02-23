chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var links = document.querySelectorAll('link[rel*="icon"]', 'link[rel*="shortcut icon"]');
  links.forEach(function(elem){elem.removeAttribute("rel");});
  var host = new URL(request.url).host;
  var index = request.tabId % 12;
  var href = chrome.extension.getURL('assets/' + index + '.ico');
  if(href){
    var link = document.createElement("link");
    link.setAttribute("rel", "shortcut icon");
    link.type = "image/x-icon";
    document.head.appendChild(link);
    var key = "zodiac-tab-data-of" + host;
    // 新しく画像を作成
    function onImageLoaded() {
      var dataUrl;
      chrome.storage.local.get(key, (items) => {
        if (!items[key]){
          var canvas = document.createElement("canvas");
          canvas.width = 16;
          canvas.height = 16;
          var context = canvas.getContext("2d");
          context.drawImage(img, 0, 0);
          context.globalCompositeOperation = "source-in";
          var color = '#'+Math.floor(Math.random()*16777215).toString(16);
          context.fillStyle = color;
          context.fillRect(0, 0, 16, 16);
          context.fill();
          dataUrl = canvas.toDataURL();
          chrome.storage.local.set({[key]: {dataUrl: dataUrl}});
        }
        else{
          dataUrl = items[key].dataUrl;
        }
        link.type = "image/x-icon";
        link.href = dataUrl;
      });
    }
    var img = document.createElement("img");
    img.crossOrigin = 'anonymous';
    img.addEventListener("load", onImageLoaded);
    img.src = href;
  }
});

