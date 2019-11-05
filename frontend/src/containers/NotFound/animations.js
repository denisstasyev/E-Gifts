import { TweenMax } from "gsap/TweenMax";

export const resolve = () => {
  TweenMax.from("#content", 1, {
    opacity: 0,
    y: 40
  });
};
