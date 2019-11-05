export const addOnLoadAnimation = resolve => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    resolve();
  } else {
    window.addEventListener("DOMContentLoaded", resolve);
  }
};
