import * as page from '../utils/page';

const hn = {};

hn.NEXT = 74;
hn.PREV = 75;
hn.highlightIndex = -1;
hn.unreadComments = [];

hn.handleKeydown = function(e) {
  const { target } = e;
  if (target.nodeName.toLowerCase() === 'textarea' || target.nodeName.toLowerCase() === 'input') {
    return;
  }

  if (e.keyCode === hn.NEXT) {
    hn.highlightIndex += 1;
    if (hn.highlightIndex >= hn.unreadComments.length) {
      hn.highlightIndex = 0;
    }
  }

  if (e.keyCode === hn.PREV) {
    hn.highlightIndex -= 1;
    if (hn.highlightIndex === -1) {
      hn.highlightIndex = hn.unreadComments.length - 1;
    }
  }

  const el = document.getElementById(hn.unreadComments[hn.highlightIndex]);
  page.scroolTo(el);
};

hn.styleNewComment = function(el, settings) {
  const { styleSettings, colorSettings } = settings;

  if (styleSettings === 'full') {
    el.style.background = colorSettings;
  }

  if (styleSettings === 'side') {
    el.style.borderLeft = `thick solid ${colorSettings}`;
    el.style.paddingLeft = '5px';
  }
};

hn.highligh = function() {
  if (!page.isActive()) {
    return;
  }

  const itemId = document.querySelector("input[name='parent']").value;

  chrome.runtime.sendMessage({ action: 'GET_ITEM', data: itemId }, result => {
    const oldComments = result[itemId];
    const comments = page.getComments();

    if (oldComments && oldComments.length > 0) {
      chrome.runtime.sendMessage({ action: 'GET_SETTINGS' }, settings => {
        const unread = comments.filter(c => !oldComments.includes(c));
        if (unread.length > 0) {
          const { title } = document;
          hn.unreadComments = unread;
          unread.forEach(comment => {
            const el = document.getElementById(comment).querySelector('td.default');
            hn.styleNewComment(el, settings);
          });
          document.title = `(${unread.length}) ${title}`;
          document.addEventListener('keydown', hn.handleKeydown, false);
        }
      });

      const data = {
        [itemId]: comments,
      };

      chrome.runtime.sendMessage({ action: 'SAVE_ITEM', data });
    }
  });
};

document.addEventListener('DOMContentLoaded', hn.highligh());
