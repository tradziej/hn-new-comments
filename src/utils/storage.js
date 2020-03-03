const chromeStorage = {
  get: (key, callback) => chrome.storage.sync.get(key, callback),
  set: (object, callback) => chrome.storage.sync.set(object, callback),
  clear: () => chrome.storage.sync.clear(),
};

export default chromeStorage;
