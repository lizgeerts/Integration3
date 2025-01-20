import { DotLottie } from '@lottiefiles/dotlottie-web';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const mm = gsap.matchMedia();
const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const loadingScreen = document.querySelector(".loading");

const lottieInstance = (canvasSelector, src) => {
  const instance = new DotLottie({
    autoplay: !hasReducedMotion,
    loop: !hasReducedMotion,
    canvas: document.querySelector(canvasSelector),
    src: src,
  });

  if (hasReducedMotion) {
    instance.addEventListener("load", () => {
      instance.pause();
    });
  }

  return instance;
};

const init = () => {
  gsap.registerPlugin(Draggable);
  gsap.registerPlugin(ScrollTrigger);

  passerSwing();
  loaderScreen();
}

const passerSwing = () => {
  if (hasReducedMotion) {
    gsap.set(".plantin-hero--pa", {
      rotation: 0,
    });
  } else {
    gsap.set(".plantin-hero--pa", {
      rotation: -4.3,
    });
    gsap.to(".plantin-hero--pa", {
      transformOrigin: '40% top',
      rotation: 4.3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1,
    });
  }

};

const loaderScreen = () => {
  lottieInstance('#loading', `${import.meta.env.BASE_URL}assets/Loading-circles.json`);
  //window.addEventListener('load', handleLoadDisappear);
}

const handleLoadDisappear = () => {
  loadingScreen.style.display = 'none';
}


init();