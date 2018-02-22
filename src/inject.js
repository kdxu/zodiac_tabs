chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var href = request.href;
  if(href){
    var link = document.querySelector('link[rel*="icon"]') || document.querySelector('link[rel*="shortcut icon"]');
    if (!link) {
      link = document.createElement("link");
    }
    link.setAttribute("rel", "shortcut icon");
    document.head.appendChild(link);
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

