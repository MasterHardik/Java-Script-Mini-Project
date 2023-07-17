var click_sound = new Audio(
  "./click_sounds/mixkit-arcade-game-jump-coin-216.wav"
);
var reset_sound = new Audio(
  "./click_sounds/mixkit-camera-shutter-click-1133.wav"
);
var error_sound = new Audio(
  "./click_sounds/mixkit-click-error-1110.wav"
);

const display = document.getElementById("screen");
var counterValue = 0;

Update = (e) => {
  if (e >= 0 && e <= 100) {
    counterValue = e;
    display.textContent = e;
  }
};

Inc = () => {
  Update(counterValue + 1);
};

Dec = () => {
  Update(counterValue - 1);
};

Reset = () => {
  Update(0);
};

clk = () => {
  click_sound.play();
};

reset_snd = () => {
    reset_sound.play()
}
