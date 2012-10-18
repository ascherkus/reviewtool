// Grabs all <a> elements containing a link to a side-by-side diff and sends
// the resulting URLs back to the extension.
(function() {
  var urls = [];
  var aElems = document.getElementsByTagName('a');
  for (var i = 0; i < aElems.length; ++i) {
    if (aElems[i].innerText == 'View' && aElems[i].href.indexOf('/diff/') > 0) {
      urls.push(aElems[i].href);
    }
  }
  chrome.extension.sendMessage(urls);
})();
