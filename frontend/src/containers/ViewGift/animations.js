import { TweenMax, Elastic } from "gsap/TweenMax";

export const resolveToTop = () => {
  TweenMax.to("#top-image", 2, {
    y: -100,
    scale: 1.2,
    ease: Elastic.easeOut.config(1.2, 0.5)
  });
};
