chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  initializePlayer(request.url);
});


function initializePlayer(url) {
  document.getElementById("player-view").src = getYoutubeEmbedUrl(url);
}

function getYoutubeEmbedUrl(url) {
  let indV = url.indexOf("v=");
  let indAmp = url.indexOf("&", indV);
  let videoId = indAmp > -1 ? url.substring(indV + 2, indAmp) : url.substring(indV + 2);

  let indList = url.indexOf("list=");
  indAmp = url.indexOf("&", indList);
  let listId = "";
  if(indList > -1) {
    listId = indAmp > -1 ? url.substring(indList + 5, indAmp) : url.substring(indList + 5);
  }

  return `https://www.youtube.com/embed/${videoId}?showinfo=0&autoplay=1&fs=0&modestbranding=1&list=${listId}`;
}

const playerContainer = document.getElementById("player-container");
const toolbar = document.getElementById("toolbar");
const content = document.getElementById("content");
const closeAction = document.getElementById("close-action");
const minimizeAction = document.getElementById("minimize-action");

toolbar.style.display = "none";

let hideToolbarTimeout = null;
playerContainer.addEventListener('mouseover', function() {
  toolbar.style.display = "block";
  clearTimeout(hideToolbarTimeout);
  hideToolbarTimeout = setTimeout(function() {
    toolbar.style.display = "none";
  }, 4000);
});

closeAction.addEventListener('click', function() {
  chrome.runtime.sendMessage({
    type: 'WINDOW_ACTION',
    action: 'CLOSE'
  });
});

minimizeAction.addEventListener('click', function() {
  chrome.runtime.sendMessage({
    type: 'WINDOW_ACTION',
    action: 'MINIMIZE'
  });
});