import { TweenMax, Elastic } from "gsap/TweenMax";

import { mobileAndTabletCheck } from "utils";
import { resolveContent } from "utils/animations";

const isMobileOrTablet = mobileAndTabletCheck();

let animationStateResolve = false;
export const resolve = () => {
  resolveContent();
  if (animationStateResolve !== true) {
    TweenMax.from("#e-image", 1, {
      opacity: 0,
      x: -40,
      y: 20,
      scale: 1.2,
      onStart: () => {
        animationStateResolve = true;
      },
      onComplete: () => {
        animationStateResolve = false;
      }
    });
    TweenMax.from("#g-image", 1, {
      opacity: 0,
      x: 40,
      y: 20,
      scale: 1.2,
      onStart: () => {
        animationStateResolve = true;
      },
      onComplete: () => {
        animationStateResolve = false;
      }
    });
  }
};

export const resolveToE = () => {
  if (!isMobileOrTablet) {
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
  if (!isMobileOrTablet) {
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
  if (!isMobileOrTablet) {
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
  if (!isMobileOrTablet) {
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
