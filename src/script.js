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

const lottieInstance = (canvasSelector, src, loop, marker) => {
  const instance = new DotLottie({
    autoplay: !hasReducedMotion,
    loop: !hasReducedMotion && loop,
    canvas: document.querySelector(canvasSelector),
    src: src,
    marker: marker
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
  quizInteraction();
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
  let stampTween

  if (!hasReducedMotion) {
    stampTween = gsap.to(stamp, {
      y: -10,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });
  }

  if (isTouchDevice) {
    document.addEventListener('touchmove', moveStamp);
    stamp.addEventListener('touchstart', (e) => {
      drag = true;
      stamp.style.cursor = "grabbing";
      stampTween.pause();

      e.preventDefault();
    });
    document.addEventListener('touchend', () => {
      if (drag) {
        drag = false;
        stamp.style.cursor = "grab";
        stamp.style.transform = `translate(${0}px, ${0}px)`;
        inner.style.opacity = 0;
        stampTween.restart();
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
        stampTween.restart();
      }
      stampTween.pause();
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

const initializeEventListeners = (quizContainer) => {
  const quizMotto = quizContainer.querySelector(".quiz__motto");
  const quizInput = quizContainer.querySelector(".quiz__input");
  const quizFeedback = quizContainer.querySelector(".quiz-feedback");
  const feedbackCanvas = quizContainer.querySelector(".feedback");
  const guessButton = quizContainer.querySelector(".quiz__guess");
  const quizClose = quizContainer.querySelector(".quiz__close");
  const options = quizContainer.querySelectorAll(".option");

  guessButton.addEventListener("click", () => {
    quizMotto.style.display = "none";
    quizInput.style.display = "flex";
  });

  quizClose.addEventListener("click", () => {
    quizMotto.style.display = "flex";
    quizInput.style.display = "none";
    quizFeedback.style.display = "none";
    feedbackCanvas.innerHTML = "";
  });

  options.forEach((option) => {
    option.addEventListener("click", () => handleOptionClick(option, quizContainer));
  });
};

const handleOptionClick = (option, quizContainer) => {
  const quizMotto = quizContainer.querySelector(".quiz__motto");
  const quizInput = quizContainer.querySelector(".quiz__input");
  const mottoLatin = quizContainer.querySelector(".quiz__latin");

  let canvas;
  let translation;

  if (quizContainer.classList.contains('printmark1')) {
    canvas = '.feedback1';
    translation = `"Exercise authority and restrain the flowing branches"`;
  } else {
    canvas = '.feedback2';
    translation = `"Christ is the true vine"`;
  }

  const isCorrect = option.getAttribute("data-correct") === "true";

  if (isCorrect) {
    lottieInstance(canvas, `${import.meta.env.BASE_URL}assets/quizfeedback.json`, false, 'Correct');
  } else {
    lottieInstance(canvas, `${import.meta.env.BASE_URL}assets/quizfeedback.json`, false, 'Wrong');
  }

  setTimeout(() => {
    if (isCorrect) {
      quizMotto.innerHTML = `<div class="quiz__motto" id="quiz__motto">
            <h2 class="quiz__title red"><span class="bold">Correct!</span></h2>
            <p class="quiz__latin red" id="motto">${mottoLatin.textContent}</p>
            <p class="quiz__latin red" id="motto">${translation}</p>
          </div>`;
    } else {
      quizMotto.innerHTML = `<div class="quiz__motto" id="quiz__motto">
            <h2 class="quiz__title red"><span class="bold">Incorrect, Let's try again!</span></h2>
            <p class="quiz__latin red" id="motto">${mottoLatin.textContent}</p>
            <a class="quiz__guess button-grid svg__big" id="guess-button">
              <p class="button__text red">Guess Translation!</p>
              <svg class="button__img" xmlns="http://www.w3.org/2000/svg" width="226" height="57" viewBox="0 0 226 57"
                fill="none">
                <path
                  d="M35.3387 5H29.5C16.5213 5 6 15.5213 6 28.5V28.5C6 41.4787 16.5213 52 29.5 52H162.185M88.8387 5H196.5C209.479 5 220 15.5213 220 28.5V28.5C220 41.4787 209.479 52 196.5 52H193.25M78.4839 5H62.0887M42.2419 5H47.4194H52.5968"
                  stroke="#B10B3A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M31.7097 1H28.5C13.3122 1 1 13.3122 1 28.5V28.5C1 43.6878 13.3122 56 28.5 56H164.484M87.7097 1H197.5C212.688 1 225 13.3122 225 28.5V28.5C225 43.6878 212.688 56 197.5 56H197M76.871 1H59.7097M38.9355 1H44.3548H49.7742"
                  stroke="#B10B3A" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>`;
    }
    quizInput.style.display = "none";
    quizMotto.style.display = "flex";

    initializeEventListeners(quizContainer);
  }, 3000);

  quizInput.style.display = "none";
};

const setupQuiz = (quizContainer) => {
  initializeEventListeners(quizContainer);
};

const quizInteraction = () => {
  const quizzes = document.querySelectorAll(".quiz");
  quizzes.forEach((quiz) => {
    setupQuiz(quiz.closest(".printmark1, .printmark2"));
  });
};

init();