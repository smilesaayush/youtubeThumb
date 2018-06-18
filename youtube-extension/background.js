const appId = "dadhkcfcacjeohaliabnimkaipdifenk";


chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tabInfo) {
    if(tabInfo.url.indexOf(".youtube.com") > -1) {
      
    }
  });
});


chrome.browserAction.onClicked.addListener(function(info) {
  const tabId = info.id;
  chrome.tabs.get(tabId, function(tabInfo) {
    if(tabInfo.url.indexOf(".youtube.com") > -1) {
      chrome.runtime.sendMessage(appId, {url: tabInfo.url});
    }
  });

  
});