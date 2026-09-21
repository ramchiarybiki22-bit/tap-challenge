let score = 0;
let time = 30;
let playing = false;
let timer;

let bestScore = Number(localStorage.getItem("tapBestScore")) || 0;

const tapButton = document.getElementById("tapButton");
const startButton = document.getElementById("startButton");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const bestScoreText = document.getElementById("bestScore");
const restartButton = document.getElementById("restartButton");
const progressBar = document.getElementById("progressBar");
const countdown = document.getElementById("countdown");
const comboText = document.getElementById("combo");
const comboMessage = document.getElementById("comboMessage");
const pointsPopup = document.getElementById("pointsPopup");
const gameOver = document.getElementById("gameOver");

const tapSound = document.getElementById("tapSound");
const gameOverSound = document.getElementById("gameOverSound");
const soundButton = document.getElementById("soundButton");

let soundOn = true;
let combo = 0;
let lastTapTime = 0;

bestScoreText.textContent = bestScore;
tapButton.disabled = true;

startButton.addEventListener("click", function () {

  score = 0;
  time = 30;
  playing = false;
  combo = 0;
  lastTapTime = 0;

  clearInterval(timer);

  scoreText.textContent = "0";
  timeText.textContent = "30";
  progressBar.style.width = "100%";
  comboText.textContent = "COMBO x0";
  comboText.style.display = "none";
  gameOver.style.display = "none";

  tapButton.disabled = false;
  tapButton.textContent = "TAP!";
  startButton.style.display = "none";

  countdown.textContent = "3";

  setTimeout(function () {
    countdown.textContent = "2";
  }, 1000);

  setTimeout(function () {
    countdown.textContent = "1";
  }, 2000);

  setTimeout(function () {
    countdown.textContent = "GO!";

    setTimeout(function () {
      countdown.textContent = "";
    }, 1000);

  }, 3000);

});

tapButton.addEventListener("click", function () {

  if (!playing) {

    playing = true;

    timer = setInterval(function () {

      time--;

      timeText.textContent = time;

      progressBar.style.width =
        (time / 30 * 100) + "%";

      if (time <= 0) {

        clearInterval(timer);
        playing = false;

        tapButton.disabled = true;
        tapButton.textContent = "TIME UP!";

        gameOver.style.display = "block";

        if (soundOn && gameOverSound) {
          gameOverSound.currentTime = 0;
          gameOverSound.play().catch(function () {});
        }

        if (score > bestScore) {

          bestScore = score;
          bestScoreText.textContent = bestScore;

          localStorage.setItem(
            "tapBestScore",
            bestScore
          );

          gameOver.innerHTML =
            "🎉 NEW BEST SCORE! 🏆<br>Your Score: " +
            score;

        } else {

          gameOver.innerHTML =
            "🎉 Game Over!<br>Your Score: " +
            score +
            "<br>🏆 Best Score: " +
            bestScore;

        }

      }

    }, 1000);

  }

  if (time > 0) {

    let points = 1;

    if (combo >= 20) {
      points = 3;
    } else if (combo >= 10) {
      points = 2;
    }

    score += points;

    const now = Date.now();

    if (now - lastTapTime < 1000) {
      combo++;
    } else {
      combo = 1;
    }

    lastTapTime = now;

    comboText.textContent = "COMBO x" + combo;
    comboText.style.display = "block";

    if (
      combo === 10 ||
      combo === 20 ||
      combo === 30
    ) {

      comboMessage.textContent =
        "🔥 COMBO " + combo + "!";

      comboMessage.classList.remove("show");

      void comboMessage.offsetWidth;

      comboMessage.classList.add("show");

    }

    scoreText.textContent = score;

    pointsPopup.textContent = "+" + points;

    pointsPopup.classList.remove("show");

    void pointsPopup.offsetWidth;

    pointsPopup.classList.add("show");

    if (soundOn && tapSound) {

      tapSound.currentTime = 0;

      tapSound.play().catch(function () {});

    }

    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    scoreText.classList.add("pop");

    tapButton.classList.remove("shake");

    void tapButton.offsetWidth;

    tapButton.classList.add("shake");

    setTimeout(function () {
      scoreText.classList.remove("pop");
    }, 100);

  }

});

restartButton.addEventListener("click", function () {

  clearInterval(timer);

  score = 0;
  combo = 0;
  time = 30;
  playing = false;
  lastTapTime = 0;

  scoreText.textContent = "0";
  timeText.textContent = "30";

  progressBar.style.width = "100%";

  comboText.textContent = "COMBO x0";
  comboText.style.display = "none";

  tapButton.disabled = false;
  tapButton.textContent = "TAP!";

  gameOver.style.display = "none";

});

soundButton.addEventListener("click", function () {

  soundOn = !soundOn;

  soundButton.textContent =
    soundOn ? "🔊 SOUND ON" : "🔇 SOUND OFF";

});

function shareScore() {

  const message =
    "🔥 Tap Challenge mein mera score " +
    score +
    " hai! Tum beat kar sakte ho?";

  if (navigator.share) {

    navigator.share({
      title: "Tap Challenge",
      text: message,
      url: "https://ramchiarybiki22-bit.github.io/tap-challenge/"
    }).catch(function () {});

  } else {

    prompt(
      "Ye message copy karo:",
      message
    );

  }

}
const premiumButton = document.getElementById("premiumButton");

premiumButton.addEventListener("click", function () {
  time = 60;
  timeText.textContent = "60";
  progressBar.style.width = "100%";
  alert("💎 Premium 60 Second Mode Activated!");
});
