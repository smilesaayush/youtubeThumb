const extId = "iohhinihdhclpgakplljecljapmoljbo";
const playerWindowId = "playerWindowId";

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  if (sender.id == extId){
    console.log(request);
    startPlayer(request.url);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.type === 'WINDOW_ACTION') {
    const playerWindow = chrome.app.window.get(playerWindowId);
    switch(request.action) {
      case 'CLOSE':
        playerWindow.close();
        break;
      case 'MINIMIZE':
        playerWindow.minimize();
        break;
    }
  }
});

async function startPlayer(url) {
  const playerWindow = await createPlayerWindow();
  playerWindow.show();
  setTimeout(function() {
    chrome.runtime.sendMessage({url});
  },0);
  
}

function createPlayerWindow() {
  return new Promise(function(resolve, reject) {
    const playerWindow = chrome.app.window.get(playerWindowId);
    if(playerWindow) {
      resolve(playerWindow);
    }
    else {
      let screenWidth = screen.availWidth;
      let screenHeight = screen.availHeight;
      let width = 500;
      let height = 300;
      
      chrome.app.window.create('index.html', {
        id: playerWindowId,
        outerBounds: {
          width: width,
          height: height,
          minWidth: 250,
          minHeight: 150,
          left: Math.round((screenWidth-width)/2),
          top: Math.round((screenHeight-height)/2)
        },
        frame: {
          type: 'none'
        },
        alwaysOnTop: true
      }, function(playerWindow) {
        resolve(playerWindow);
      });
    }

  });
}