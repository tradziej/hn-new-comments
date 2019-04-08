import style from '../css/main.css';
import * as page from '../utils/page';

const highlight = () => {
  if (!page.isActive()) {
    return;
  }

  const itemId = document.querySelector("input[name='parent']").value;

  chrome.runtime.sendMessage({ action: 'GET_ITEM', data: itemId }, result => {
    const oldComments = result[itemId];
    const comments = page.getComments();

    if (oldComments && oldComments.length > 0) {
      comments.forEach(comment => {
        if (!oldComments.includes(comment)) {
          const el = document.getElementById(comment);
          el.querySelector('td.default').className += ' hn-new-comment';
        }
      });
    }

    const data = {
      [itemId]: comments,
    };

    chrome.runtime.sendMessage({ action: 'SAVE_ITEM', data });
  });
};

document.addEventListener('DOMContentLoaded', highlight());
