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

let animationState = false;
export const resolveContent = () => {
  if (animationState !== true) {
    TweenMax.from("#content", 1, {
      opacity: 0,
      y: 40,
      onStart: () => {
        animationState = true;
      },
      onComplete: () => {
        animationState = false;
      }
    });
  }
};
