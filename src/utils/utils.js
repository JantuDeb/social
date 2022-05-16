export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

export const getSortedPosts = (posts, state) => {
  const postsToSort = posts.slice();
  if (state.sortBy === "old") {
    return postsToSort.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  } else if (state.sortBy === "new") {
    return postsToSort.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else {
    return postsToSort.sort((a, b) => {
      return b.statistics.likeCount - a.statistics.likeCount;
    });
  }
};

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}
