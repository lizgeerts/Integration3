import { DotLottie } from '@lottiefiles/dotlottie-web';

gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSemiLarge = window.matchMedia("(min-width: 800px)").matches;
const isLarge = window.matchMedia("(min-width: 1200px)").matches;
const is1000 = window.matchMedia("(min-width: 1000px)").matches;
const is1900 = window.matchMedia("(min-width: 1900px)").matches;
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
const loadingScreen = document.querySelector(".loading");

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

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    document.querySelector('.stamp').style.margin = '0 auto';
  }

  passerSwing();
  loaderScreen();
  hamburgerMenu();
  heroAnimations();
  introAnimations();
  stampAnimation();
  quizInteraction();
  drawCircle();
  horizontalScroll();
  revealImages();
  hoverImages();
  intoPages();
  dragBook();
  biblePopUp();
  quoteTyped();
  extraAnimations();
}

const passerSwing = () => {
  const passers = document.querySelectorAll(".plantin-hero--pa , .sitting__passer");
  const passerVS = document.querySelector(".vs__compass");

  passers.forEach(passer => {
    if (hasReducedMotion) {
      gsap.set(passer, {
        rotation: 0,
      });
    } else {
      gsap.set(passer, {
        rotation: -4.3,
      });
      gsap.to(passer, {
        transformOrigin: '40% top',
        rotation: 4.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1,
      });
    }
  });

  if (is1000) {
    if (hasReducedMotion) {
      gsap.set(passerVS, {
        rotation: 0,
      });
    } else {
      gsap.set(passerVS, {
        rotation: -1,
      });
      gsap.to(passerVS, {
        transformOrigin: '50% top',
        rotation: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1,
      });
    }
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
  const menuLinks = document.querySelectorAll(".menu__link");

  menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

}

const toggleMenu = () => {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');

  if (menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden'; // Disable scrolling
  } else {
    document.body.style.overflow = ''; // Re-enable scrolling
  }
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
        marginTop: "-12rem",
        ease: "power2.out",
        duration: 2
      }, "-=1"
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
  const cpImg = document.querySelectorAll(".cp__img");
  const mathImg = document.querySelector(".math__img");
  const cta = document.querySelector(".inf__cta");

  if (!hasReducedMotion) {
    gsap.set(yearLetters, {
      y: () => gsap.utils.random(-20, 20),
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
}

const stampAnimation = () => {
  gsap.set(inner, { opacity: 0 });
  let stampTween;
  gsap.set(stamp, { y: 0, x: 0 });

  if (!hasReducedMotion) {
    stampTween = gsap.to(stamp, {
      y: -10,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });
  }

  Draggable.create(stamp, {
    type: "x,y",
    edgeResistance: 0.65,
    bounds: ".stamp",
    onPress: () => {
      stamp.style.cursor = "grabbing";
      stampTween.pause();
    },
    onDrag: () => {
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
    },
    onRelease: () => {
      stamp.style.cursor = "grab";
      stampTween.restart();

      gsap.to(stamp, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });

      inner.style.opacity = 0;
    }
  });
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

const drawCircle = () => {
  const compassLeg = document.querySelector('.compasses__leg');
  const compassCircle = document.querySelector('.compasses__circle');
  const resetButton = document.getElementById('resetButton');

  let isDragging = false;
  let startX = 0;
  let startRotation = 0;
  let currentRotation = 0;
  let maxRotationReached = 0;
  const maxRotation = 110;

  compassLeg.addEventListener('click', (e) => {
    isDragging = !isDragging;
    compassLeg.style.cursor = isDragging ? "grabbing" : "grab";
    gsap.to(document.querySelector(".quote__interact"), {
      opacity: 1,
      color: "var(--red)",
      duration: 0.2,
      ease: "power2.out"
    });

    if (!isDragging) {
      compassLeg.style.transform = `rotate(${0}deg)`;
      resetButton.style.display = 'block';
    } else {
      startX = e.clientX;
    }
  });

  compassLeg.addEventListener('touchstart', (e) => {
    gsap.to(document.querySelector(".quote__interact"), {
      opacity: 1,
      color: "var(--red)",
      duration: 0.2,
      ease: "power2.out"
    });
    isDragging.toggl
    if (isTouchDevice) {
      e.preventDefault();
      isDragging = true;
      startX = e.touches[0].clientX;
    }
    if (isDragging && !isTouchDevice) {
      isDragging = false;
      resetButton.style.display = 'block';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const rotateX = e.clientX - startX; //calculate how far mouse has moved since pickup
      currentRotation = startRotation - rotateX * 0.45;
      currentRotation = Math.min(maxRotation, Math.max(-maxRotation, currentRotation));
      compassLeg.style.transform = `rotate(${currentRotation}deg)`;

      maxRotationReached = Math.max(maxRotationReached, Math.abs(currentRotation));

      const radius = maxRotationReached * 4;
      compassCircle.style.width = `${radius}px`;
      compassCircle.style.height = `${radius}px`;
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && isTouchDevice) {
      const rotateX = e.touches[0].clientX - startX;
      currentRotation = startRotation - rotateX * 0.45;
      currentRotation = Math.min(maxRotation, Math.max(-maxRotation, currentRotation));

      gsap.to(compassLeg, {
        rotation: currentRotation,
        duration: 0.1
      });

      maxRotationReached = Math.max(maxRotationReached, Math.abs(currentRotation));

      const radius = maxRotationReached * 3;
      compassCircle.style.width = `${radius}px`;
      compassCircle.style.height = `${radius}px`;
    }
  });

  window.addEventListener('touchend', () => {
    if (isDragging && isTouchDevice) {
      isDragging = false;
      resetButton.style.display = 'block';
    }
  });

  resetButton.addEventListener('click', () => {
    gsap.to(compassLeg, { rotation: 0, duration: 0.5 });
    gsap.to(compassCircle, { width: 0, height: 0, duration: 0.5 });
    resetButton.style.display = 'none';
    maxRotationReached = 0;
  });
}

const horizontalScroll = () => {
  if (is1000) {
    const horizontal = document.querySelector(".horizontal");

    const endValue = is1900 ? window.innerWidth : horizontal.scrollWidth;

    gsap.to(horizontal, {
      x: () => -(horizontal.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: horizontal,
        pin: horizontal,
        scrub: 1,
        start: "bottom 90%",
        end: () => `+=${endValue}`,
      },
    });
  }

}

const revealImages = () => {

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".koepel",
      start: "12% 20%",
      end: "bottom top",
      pin: ".koepel",
      scrub: true,
      markers: false
    },
  });

  timeline
    .fromTo(".koepel__sitting", {
      y: 0,
    },
      {
        y: -50,
        opacity: 0,
      })
    .from(".koepel__reveal", {
      y: 50,
      opacity: 0,
      onStart: () => {
        document.querySelector(".koepel__reveal").style.display = "grid";
      },
    });
}

const showImage = (wordClass) => {
  const images = document.querySelectorAll(".show");

  images.forEach((image) => image.classList.remove("active"));

  const targetImage = document.querySelector(`.reveal__${wordClass}`);
  if (targetImage) {
    targetImage.classList.add("active");
  }
};

const showDefaultImage = () => {
  const images = document.querySelectorAll(".show");

  images.forEach((image) => image.classList.remove("active"));

  const defaultImage = document.querySelector(".reveal__start");
  if (defaultImage) {
    defaultImage.classList.add("active");
  }
};

const handleDesktopHover = (word) => {
  const wordClass = word.classList[2];

  word.addEventListener("mouseenter", () => {
    showImage(wordClass);
  });

  word.addEventListener("mouseleave", () => {
    showDefaultImage();
  });
};

const handleMobileClick = (word) => {
  const wordClass = word.classList[2];
  const targetImage = document.querySelector(`.reveal__${wordClass}`);
  let isActive = false;

  word.addEventListener("click", () => {
    if (targetImage) {
      if (!isActive) {
        targetImage.classList.add("active");
        isActive = true;
      } else {
        targetImage.classList.remove("active");
        isActive = false;
        showDefaultImage();
      }
    }
  });
};

const hoverImages = () => {
  const words = document.querySelectorAll(".word");

  words.forEach((word) => {
    handleDesktopHover(word);
    handleMobileClick(word);
  });
}

const intoPages = () => {
  const images = document.querySelectorAll(".vs__labor, .vs__constancy");

  images.forEach((container) => {
    const image = container.querySelector("img.constancy__hover, img.labor__hover");

    container.addEventListener("click", (event) => {
      event.preventDefault();

      const targetPage = container.getAttribute("href");

      const clone = container.cloneNode(true);
      document.body.appendChild(clone);
      const clonedImage = clone.querySelector("img.constancy__hover, img.labor__hover");
      clonedImage.remove();

      gsap.set(clone, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: image.offsetWidth,
        height: image.offsetHeight,
        borderRadius: "50%",
        clipPath: "circle(50% at 50% 50%)",
        zIndex: 5,
        pointerEvents: "none",
        backgroundColor: "var(--bg)",
        opacity: 1
      });

      gsap.to(clone, {
        scale: 4,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          window.location.href = targetPage;
        },
      })
    });
  });
}

const dragBook = () => {
  const book = document.querySelector(".object__img");
  const portrait = document.querySelector(".portrait__img");

  const draggableBook = Draggable.create(book, {
    type: "x,y",
    bounds: ".next__first",
    onDragEnd: function () {
      if (isOverlapping(book, portrait)) {
        fadeInOut();
        const discover = document.querySelector(".next");
        if (discover) {
          discover.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
  });
}

const isOverlapping = (book, portrait) => {
  const rect1 = book.getBoundingClientRect();
  const rect2 = portrait.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

const fadeInOut = () => {
  const discoverSection = document.querySelector(".next__discover");
  const firstSection = document.querySelector(".next__first");

  const tl = gsap.timeline();

  tl
    .to(firstSection, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        firstSection.style.display = "none";
      },
    })
    .set(discoverSection, { display: "flex" })
    .from(discoverSection, {
      y: 30,
      opacity: 0,
      duration: 0.5,
    });

}

const biblePopUp = () => {
  const bible = document.querySelector(".object__img");
  const note = document.querySelector(".object__note");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".portrait",
      pin: false,
      start: "top 110",
      end: `top`,
    }
  });

  tl
    .fromTo(bible, {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
    })
    .fromTo(note, {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
    }, "-=0.7");
}

const quoteTyped = () => {
  const quote = document.querySelector(".motto__quote");
  const fullText = quote.innerText;

  if (!hasReducedMotion) {
    gsap.fromTo(quote,
      {
        textContent: ""
      },
      {
        scrollTrigger: {
          trigger: ".motto",
          start: "10% 5%",
          end: "10% top",
          toggleActions: "play none reverse none",
        },
        textContent: fullText,
        duration: fullText.length * 0.03,
        ease: "linear",
        onUpdate: function () {
          quote.innerHTML = fullText.slice(0, Math.ceil(this.progress() * fullText.length));
        }
      });
  }
}

const extraAnimations = () => {
  const printImages = document.querySelectorAll(".printmark2__img, .printmark1__img");

  if (!hasReducedMotion) {
    printImages.forEach((image, index) => {
      const delay = index * 0.9; 

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 3,
        delay: delay, 
      });

      tl
        .to(image, {
          rotation: -2,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(image, {
          rotation: 2,
          duration: 0.3,
          ease: "power1.inOut",
        })
        .to(image, {
          rotation: -2,
          duration: 0.3,
          ease: "power1.inOut",
        })
        .to(image, {
          rotation: 2,
          duration: 0.3,
          ease: "power1.inOut",
        })
        .to(image, {
          rotation: 0,
          duration: 0.5,
          ease: "power1.inOut",
        });
    });
  }
}


init();