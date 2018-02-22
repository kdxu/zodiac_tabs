chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var href = request.href;
  if(href){
    var links = document.querySelectorAll('link[rel*="icon"]', 'link[rel*="shortcut icon"]');
    links.forEach(function(elem){elem.href = "";});
    var link = document.createElement("link");
    document.head.appendChild(link);
    link.setAttribute("rel", "shortcut icon");
    function onImageLoaded() {
      var canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      var context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);
      context.globalCompositeOperation = "source-in";
      context.fillStyle = request.color;
      context.fillRect(0, 0, 16, 16);
      context.fill();
      link.type = "image/x-icon";
      link.href = canvas.toDataURL();
    };
    var img = document.createElement("img");
    img.crossOrigin = 'anonymous';
    img.addEventListener("load", onImageLoaded);
    img.src = href;
  }
});

