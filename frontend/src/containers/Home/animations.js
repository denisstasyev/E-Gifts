import { TweenMax, Elastic } from "gsap/TweenMax";

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export const resolve = () => {
  TweenMax.from("#content", 1, {
    opacity: 0,
    y: 40
  });
  TweenMax.from("#e-image", 1, {
    opacity: 0,
    x: -40,
    y: 20,
    scale: 1.2
  });
  TweenMax.from("#g-image", 1, {
    opacity: 0,
    x: 40,
    y: 20,
    scale: 1.2
  });
};

export const resolveToE = () => {
  if (!iOS) {
    TweenMax.to("#e-image", 1, {
      x: -20,
      y: 10,
      scale: 1.2,
      ease: Elastic.easeOut.config(1.2, 0.5)
    });
    TweenMax.to("#e-letter", 1, {
      scale: 1.2,
      ease: Elastic.easeOut.config(4, 0.5)
    });
  }
};

export const resolveOutE = () => {
  if (!iOS) {
    TweenMax.to("#e-image", 1, {
      x: 0,
      y: 0,
      scale: 1,
      ease: Elastic.easeOut.config(1.2, 0.5)
    });
    TweenMax.to("#e-letter", 1, {
      scale: 1,
      ease: Elastic.easeOut.config(4, 0.5)
    });
  }
};

export const resolveToG = () => {
  if (!iOS) {
    TweenMax.to("#g-image", 1, {
      x: 20,
      y: 10,
      scale: 1.2,
      ease: Elastic.easeOut.config(1.2, 0.5)
    });
    TweenMax.to("#g-letter", 1, {
      scale: 1.2,
      ease: Elastic.easeOut.config(4, 0.5)
    });
  }
};

export const resolveOutG = () => {
  if (!iOS) {
    TweenMax.to("#g-image", 1, {
      x: 0,
      y: 0,
      scale: 1,
      ease: Elastic.easeOut.config(1.2, 0.5)
    });
    TweenMax.to("#g-letter", 1, {
      scale: 1,
      ease: Elastic.easeOut.config(4, 0.5)
    });
  }
};
