import { DotLottie } from '@lottiefiles/dotlottie-web';

new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#canvas"),
  src: "./public/assets/Loading-circles.json",
});
