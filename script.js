const guessInput = document.getElementById("guess");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const message = document.getElementById("message");
const guessesGrid = document.getElementById("guesses-grid");

let hiddenNumber = generateHiddenNumber();
let attempts = 5;

guessInput.addEventListener("input", () => {
  submitBtn.disabled = !isValidGuess(guessInput.value);
  submitBtn.style.backgroundColor = isValidGuess(guessInput.value) ? "#8fd3f4" : "#ccc";
});

submitBtn.addEventListener("click", () => {
  if (attempts === 0) {
    return;
  }

  const guess = guessInput.value;
  const feedback = compareGuess(hiddenNumber, guess);

  if (feedback === "+4") {
    message.textContent = "Congratulations! You've won the game!";
    submitBtn.disabled = true;
    resetBtn.classList.remove("hidden");
  } else {
    attempts--;

    addToGuessesGrid(guess, feedback);

    if (attempts === 0) {
      message.textContent = `Game over! The hidden number was ${hiddenNumber}.`;
      submitBtn.disabled = true;
      resetBtn.classList.remove("hidden");
    } else {
      message.textContent = `Remaining attempts: ${attempts}.`;
    }
  }

  guessInput.value = "";
  submitBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  hiddenNumber = generateHiddenNumber();
  attempts = 5;
  message.textContent = "";
  guessesGrid.innerHTML = "";
  resetBtn.classList.add("hidden");
  submitBtn.disabled = true;
  document.body.style.backgroundImage = `linear-gradient(45deg, #${Math.floor(Math.random() * 16777215).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`;
});

function generateHiddenNumber() {
  let hiddenNumber = "";
  while (hiddenNumber.length < 4) {
    const digit = Math.floor(Math.random() * 10).toString();
    if (!hiddenNumber.includes(digit)) {
      hiddenNumber += digit;
    }
  }
  return hiddenNumber;
}

function isValidGuess(guess) {
  if (guess.length !== 4) {
    return false;
  }

  for (let i = 0; i < guess.length; i++) {
    if (isNaN(guess[i]) || guess.indexOf(guess[i]) !== guess.lastIndexOf(guess[i])) {
      return false;
    }
  }
  return true;
}

function compareGuess(hiddenNumber, guess) {
  let plus = 0;
  let minus = 0;

  for (let i = 0; i < 4; i++) {
    if (hiddenNumber[i] === guess[i]) {
      plus++;
    } else if (hiddenNumber.includes(guess[i])) {
      minus++;
    }
  }

  let feedback = "";
  if (plus > 0) feedback += `+${plus}`;
  if (minus > 0) feedback += (feedback ? ", " : "") + `-${minus}`;

  return feedback;
}

function addToGuessesGrid(guess, feedback) {
  const guessElement = document.createElement("div");
  guessElement.textContent = `${guess} (${feedback})`;
  guessesGrid.appendChild(guessElement);
}
