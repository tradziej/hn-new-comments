import style from '../css/main.css';
import chromeStorage from '../utils/storage';

const isActive = () => document.querySelector("input[name='parent']");

const highlight = () => {
  if (!isActive()) {
    return;
  }

  const itemId = document.querySelector("input[name='parent']").value;

  chromeStorage.set({ key: itemId }, function() {
    console.log(`Value is set to ${itemId}`);
  });

  chromeStorage.get(['key'], function(result) {
    console.log(`Value currently is ${result.key}`);
  });
};

document.addEventListener('DOMContentLoaded', highlight());
