// Two varieties of code review URLs:
//   1) http://codereview.chromium.org/###/
//   2) http://chromiumcodereview.appspot.com/###/
var chromiumRegexp = /^https?:\/\/codereview\.chromium\.org\/[0-9]+\/?$/;
var appspotRegexp = /^https?:\/\/chromiumcodereview\.appspot\.com\/[0-9]+\/?$/;

function isRietveldUrl(tabId, changeInfo, tab) {
  if (chromiumRegexp.test(tab.url) || appspotRegexp.test(tab.url)) {
    chrome.pageAction.show(tabId);
  }
}

// Injects script to grab the side-by-side diff URLs from the DOM.
function getDiffs(tab) {
  chrome.tabs.executeScript(tab.id, { file:'inject.js' });
}

// Opens all |urls| next to the current tab.
function openDiffs(urls, sender) {
  console.log(urls);

  for (var i = 0; i < urls.length; ++i) {
    chrome.tabs.create({
      url: urls[i],
      index: (sender.tab.index + 1 + i),
      active: false
    });
  }
}

chrome.tabs.onUpdated.addListener(isRietveldUrl);
chrome.pageAction.onClicked.addListener(getDiffs);
chrome.extension.onMessage.addListener(openDiffs);