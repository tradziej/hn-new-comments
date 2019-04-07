import style from '../css/main.css';

function highlight() {
  const itemId = (document.querySelector("input[name='parent']") || {}).value;

  if (!itemId) {
    return;
  }

  chrome.storage.sync.set({ key: itemId }, function() {
    console.log(`Value is set to ${itemId}`);
  });

  chrome.storage.sync.get(['key'], function(result) {
    console.log(`Value currently is ${result.key}`);
  });
}

document.addEventListener('DOMContentLoaded', highlight());
