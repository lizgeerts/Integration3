import { DotLottie } from '@lottiefiles/dotlottie-web';

new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#canvas"),
  src: "./src/assets/Loading-circles.json",
});

const init = () => {
  gsap.registerPlugin(Draggable);
  gsap.registerPlugin(ScrollTrigger);

  passerSwing();
}

const passerSwing = () => {
  gsap.set(".plantin-hero--pa", {
    rotation: -4.3,
  })
  gsap.to(".plantin-hero--pa", {
    transformOrigin: '40% top',
    rotation: 4.3,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 1,
  });

};

init();