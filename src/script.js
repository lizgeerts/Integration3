import { DotLottie } from '@lottiefiles/dotlottie-web';

gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollTrigger)

const mm = gsap.matchMedia();
const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSemiLarge = window.matchMedia("(min-width: 800px)").matches;
const isLarge = window.matchMedia("(min-width: 1200px)").matches;
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
const loadingScreen = document.querySelector(".loading");

let drag = false;
const stamp = document.querySelector('.stamp__img');
const inner = document.querySelector('.pickup__inner');

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

  passerSwing();
  loaderScreen();
  hamburgerMenu();
  heroAnimations();
  introAnimations();
  stampAnimation();
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

  document.body.style.overflowY = "auto";

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

  if (isLarge) {
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

const introAnimations = () => {
  const yearLetters = document.querySelectorAll(".year-letter");
  const yearRight = document.querySelectorAll(".year-letter--right");
  const yearLeft = document.querySelectorAll(".year-letter--left");
  const infText = document.querySelector(".inf__text");
  const cpPasser = document.querySelector(".cp__passer");
  const cpImg = document.querySelector(".cp__img--phone");
  const mathImg = document.querySelector(".math__img");
  const cta = document.querySelector(".inf__cta");

  gsap.set(yearLetters, {
    y: () => gsap.utils.random(-20, 20), // Random vertical position
    rotation: () => gsap.utils.random(-30, 30), // Random rotation
  });

  const getStartingPosition = (isLeft) => {
    const viewportWidth = window.innerWidth;
    const minViewport = 380;
    const maxViewport = 1440;

    const percentage = gsap.utils.interpolate(
      isLeft ? -100 : 100,
      isLeft ? -450 : 450,
      (viewportWidth - minViewport) / (maxViewport - minViewport)
    );

    return `${percentage}%`;
  };

  gsap.set(yearLeft, {
    x: () => getStartingPosition(true),
  });

  gsap.set(yearRight, {
    x: () => getStartingPosition(false),
  });

  gsap.set([infText, cpPasser, cpImg, mathImg, cta], {
    opacity: 0,
    y: 50,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro",
      start: "top 60%",
      end: "top 20%",
      toggleActions: "play complete reverse reset",
      scrub: 2,
    },
  });

  yearLetters.forEach((letter, index) => {
    tl.to(
      letter,
      {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
      },
      index * 0.2
    );
  });

  tl.to(
    infText,
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.5"
  )
    .to(
      cpPasser,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .to(
      cta,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .to(
      cpImg,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .to(
      mathImg,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );

}

const stampAnimation = () => {
  gsap.set(inner, { opacity: 0 });
  if (isTouchDevice) {
    document.addEventListener('touchmove', moveStamp);
    stamp.addEventListener('touchstart', (e) => {
      drag = true;
      stamp.style.cursor = "grabbing";

      e.preventDefault();
    });
    document.addEventListener('touchend', () => {
      if (drag) {
        drag = false;
        stamp.style.cursor = "grab";
        stamp.style.transform = `translate(${0}px, ${0}px)`;
        inner.style.opacity = 0;
      }
    });
  } else {
    document.addEventListener('mousemove', moveStamp);
    stamp.addEventListener('click', (e) => {
      drag = !drag;
      stamp.style.cursor = drag ? "grabbing" : "grab";

      if (!drag) {
        stamp.style.transform = `translate(${0}px, ${0}px)`;
        inner.style.opacity = 0;
      }
    });
  }
}

const moveStamp = (e) => {
  if (drag) {
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;

    const posX = x - stamp.offsetWidth / 2;
    const posY = y - stamp.offsetHeight;
    stamp.style.transform = `translate(${posX}px, ${posY}px)`;

    const stampRect = stamp.getBoundingClientRect();
    const innerRect = inner.getBoundingClientRect();

    if (
      stampRect.left < innerRect.right &&
      stampRect.right > innerRect.left &&
      stampRect.top < innerRect.bottom &&
      stampRect.bottom > innerRect.top
    ) {
      inner.style.opacity = 1;
    } else {
      inner.style.opacity = 0;
    }
  }
};


init();