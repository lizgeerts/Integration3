import { DotLottie } from '@lottiefiles/dotlottie-web';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const mm = gsap.matchMedia();
const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSemiLarge = window.matchMedia("(min-width: 800px)").matches;
const isLarge = window.matchMedia("(min-width: 1200px)").matches;
const loadingScreen = document.querySelector(".loading");

const lottieInstance = (canvasSelector, src, loop) => {
  const instance = new DotLottie({
    autoplay: !hasReducedMotion,
    loop: !hasReducedMotion && loop,
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
  document.documentElement.classList.add('has-js');
  gsap.registerPlugin(Draggable);
  gsap.registerPlugin(ScrollTrigger);

  passerSwing();
  loaderScreen();
  hamburgerMenu();
  heroAnimations();
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
  lottieInstance('#loading', `${import.meta.env.BASE_URL}assets/Loading-circles.json`, true);
  window.addEventListener('load', handleLoadDisappear);
}

const handleLoadDisappear = () => {
  loadingScreen.style.display = 'none';
}

const hamburgerMenu = () => {
  document.querySelector('.hamburger').addEventListener('click', toggleMenu);
  document.querySelector('.close-btn').addEventListener('click', toggleMenu);
}


const toggleMenu = () => {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

const heroAnimations = () => {
  const button = document.querySelector(".hero__button");

  if (!hasReducedMotion) {
    gsap.to(button, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut",
    });
  }

  button.addEventListener("click", handleButtonClicked);
}

const handleButtonClicked = () => {
  const introduction = document.querySelector(".introduction");
  const plantinName = document.querySelector(".plantin__name");
  const houseName = document.querySelector(".house__name")
  const start = document.querySelector(".start");
  const plantinImage = document.querySelector(".plantin");
  const saleSign = document.querySelector(".sign");
  const soldSign = document.querySelector(".sign-sold");

  const tl = gsap.timeline();

  tl
    .to(introduction, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        introduction.classList.add("hidden");
      },
    })
    .to(plantinName, {
      opacity: 0,
      duration: 0.8,
    }, "<")
    .fromTo(
      start,
      {
        opacity: 0
      },
      {
        opacity: 1,
        display: "flex",
        duration: 1,
      });

 if(isLarge){
    tl.to(
      plantinImage,
      {
        scale: 1.6,
        x: "-70%",
        y: "-40%",
        duration: 1.5,
        ease: "power2.out",
      },
      "<"
    )
 } else if (isSemiLarge) {
   tl.to(
     plantinImage,
     {
       scale: 1.5,
       x: "-60%",
       y: "-60%",
       duration: 1.5,
       ease: "power2.out",
     },
     "<"
   )
     .to(
       document.querySelector(".hero__house"), {
       marginTop: "-13rem",
       ease: "power2.out",
       duration: 2
     }
     )
   //  document.querySelector(".hero__house").classList.toggle("before");
 } else {
    tl.to(
      plantinImage,
      {
        scale: 2,
        x: "-50%",
        y: "-7%",
        duration: 1.5,
        ease: "power2.out",
      },
      "<"
    )
  };

  tl.to(
    saleSign,
    {
      y: 100,
      rotation: -40,
      opacity: 0,
      duration: 1,
      ease: "power2.in",
      onComplete: () => {
        saleSign.classList.add("hidden");
      },
    })
    .fromTo(
      soldSign,
      {
        x: 70,
        opacity: 0,
        rotation: 30
      },
      {
        x: 10,
        rotation: 0,
        opacity: 1,
        display: "block",
        duration: 1.3,
        ease: "power2.out",
      }, "+=0.2")
    .to(houseName, {
      opacity: 0,
      duration: 0.8,
    }, "<");

  tl.call(() => {
    lottieInstance(
      ".house__name--animation",
      `${import.meta.env.BASE_URL}assets/text-animation.json`,
      false
    );
  });

}

init();