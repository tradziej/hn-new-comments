import chromeStorage from '../utils/storage';

chrome.runtime.onMessage.addListener(({ action, data }, sender, sendResponse) => {
  switch (action) {
    case 'SAVE_ITEM':
      chromeStorage.set(data, function() {
        sendResponse(data);
      });
      // it's a asynchronous response
      return true;
    case 'GET_ITEM':
      chromeStorage.get(data, function(result) {
        sendResponse(result);
      });
      // it's a asynchronous response
      return true;
    default:
      return false;
  }
});