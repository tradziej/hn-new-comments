export const isActive = () => document.querySelector("input[name='parent']");

export const getComments = () => {
  const comments = document.querySelectorAll('td .athing.comtr');
  return [].map.call(comments, comment => comment.id);
};
