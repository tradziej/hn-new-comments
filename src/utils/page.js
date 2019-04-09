export const isActive = () => document.querySelector("input[name='parent']");

export const getComments = () => {
  const comments = document.querySelectorAll('td .athing.comtr');
  return [].map.call(comments, comment => comment.id);
};

export const scroolTo = el => {
  if (el === null) return;

  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: el.getBoundingClientRect().top + window.scrollY,
  });
};
