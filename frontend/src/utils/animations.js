import { TweenMax } from "gsap/TweenMax";

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

export const resolveContent = () => {
  TweenMax.from("#content", 1, {
    opacity: 0,
    y: 40
  });
};
