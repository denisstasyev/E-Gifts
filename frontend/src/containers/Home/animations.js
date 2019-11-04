import TweenMax from "gsap/TweenMax";

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

export const resolveToImageE = () => {
  TweenMax.to("#e-image", 0.8, {
    x: -20,
    y: 10,
    scale: 1.2
  });
};
export const resolveOutImageE = () => {
  TweenMax.to("#e-image", 0.8, {
    x: 0,
    y: 0,
    scale: 1
  });
};

export const resolveToImageG = () => {
  TweenMax.to("#g-image", 0.8, {
    x: 20,
    y: 10,
    scale: 1.2
  });
};
export const resolveOutImageG = () => {
  TweenMax.to("#g-image", 0.8, {
    x: 0,
    y: 0,
    scale: 1
  });
};

export const resolveToLetterE = () => {
  TweenMax.to("#e-letter", 0.1, {
    scale: 1.2
  });
  resolveToImageE();
};
export const resolveOutLetterE = () => {
  TweenMax.to("#e-letter", 0.1, {
    scale: 1
  });
  resolveOutImageE();
};

export const resolveToLetterG = () => {
  TweenMax.to("#g-letter", 0.1, {
    scale: 1.2
  });
  resolveToImageG();
};
export const resolveOutLetterG = () => {
  TweenMax.to("#g-letter", 0.1, {
    scale: 1
  });
  resolveOutImageG();
};
