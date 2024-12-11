const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];
let started = false;

// Add event listener to start the game
document.addEventListener("keydown", startGame);

function startGame() {
  if (!started) {
    started = true;
    gameSequence = [];
    userSequence = [];
    updateHeading("Watch the sequence and remember it!");
    nextSequence();
  }
}

function nextSequence() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
  userSequence = [];
  disableBoxes(true); // Disable user input
  playSequence();
}

// Play the sequence for the user to watch
function playSequence() {
  let index = 0;

  const interval = setInterval(() => {
    if (index < gameSequence.length) {
      const color = gameSequence[index];
      flashColor(color);
      playSound(color);
      index++;
    } else {
      clearInterval(interval);
      updateHeading("Your turn!");
      disableBoxes(false); // Enable user input after sequence is shown
    }
  }, 800); // 800ms between flashes
}

function flashColor(color) {
  const element = document.getElementById(color);
  element.classList.add("active");
  setTimeout(() => element.classList.remove("active"), 400);
}

function playSound(color) {
  const sound = document.getElementById(`sound-${color}`);
  sound.play();
}

document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click", (e) => {
    const chosenColor = e.target.id;
    userSequence.push(chosenColor);
    flashColor(chosenColor);
    playSound(chosenColor);
    checkAnswer(userSequence.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (userSequence[currentLevel] !== gameSequence[currentLevel]) {
    showPopup();
    resetGame();
  } else if (userSequence.length === gameSequence.length) {
    setTimeout(() => {
      updateHeading("Watch the sequence and remember it!");
      nextSequence();
    }, 1000);
  }
}

function showPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
    updateHeading("Press a Key to Start");
  }, 5000);
}

function updateHeading(text) {
  const heading = document.getElementById("game-heading");
  heading.textContent = text;
}

// Disable or enable the boxes based on the state
function disableBoxes(disable) {
  const boxes = document.querySelectorAll(".box");
  if (disable) {
    boxes.forEach((box) => box.classList.add("disabled"));
  } else {
    boxes.forEach((box) => box.classList.remove("disabled"));
  }
}

function resetGame() {
  started = false;
}
