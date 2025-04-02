const wordList = [
  "gold",
  "luck",
  "clover",
  "rain",
  "charm",
  "parade",
  "leprechaun",
  "treasure",
  "celebration",
  "greenery",
  "shenanigans",
  "tradition",
];

// Setting game variables
let selectedWord = "";
let displayedWord = "";
let wrongGuesses = 0;
let guessedLetters = [];
let slots;
const maxMistakes = 1.2;
let winCount = 0;
let lossCount = 0;

// Function to start the game
function startGame(level) {
  console.log("Starting game with difficulty: " + level);

  selectedWord = getRandomWord(level);
  slots = new Array(selectedWord.length);
  for (let i = 0; i < slots.length; i++) {
    slots[i] = "_";
  }

  // Update difficulty display
  updateDifficultyDisplay(level);

  // Create the placeholder for the selected word
  displayedWord = " _ ".repeat(selectedWord.length);
  document.getElementById("wordDisplay").textContent = displayedWord
    .split("")
    .join("");

  // Hide difficulty selection and show the game area
  document.getElementById("difficultySelection").classList.add("d-none");
  document.getElementById("gameArea").classList.remove("d-none");
  document.getElementById("difficultyBox").classList.remove("d-none");

  document.getElementById("gameArea").classList.add("d-block");
  document.getElementById("difficultyBox").classList.add("d-block");
}

// Function to get a random word based on difficulty
function getRandomWord(level) {
  let filteredWords = wordList.filter((word) => {
    if (level === "easy") return word.length <= 4;
    if (level === "medium") return word.length >= 5 && word.length <= 7;
    if (level === "hard") return word.length >= 8;
  });

  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

// Update difficulty display
function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById("difficultyBox");

  // Remove any previous difficulty classes
  difficultyBox.classList.remove("easy", "medium", "hard");

  // Set text and apply class dynamically using template literals
  difficultyBox.textContent = `Difficulty: ${
    level.charAt(0).toUpperCase() + level.slice(1)
  }`;
  difficultyBox.classList.add(level);
}

// Guess letter function
function guessLetter() {
  let inputField = document.getElementById("letterInput"); // Get input field
  let guessedLetter = inputField.value.toLowerCase(); // Convert input to lowercase

  // Check if input is a valid letter (a-z)
  if (!guessedLetter.match(/^[a-z]$/)) {
    alert("Please enter a valid letter (a-z)!");
    inputField.value = "";
    return;
  }

  // Check if letter was already guessed
  if (guessedLetters.includes(guessedLetter)) {
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`);
    inputField.value = "";
    return;
  } else {
    guessedLetters.push(guessedLetter);
  }

  if (selectedWord.includes(guessedLetter)) {
    correctGuess(guessedLetter);
  } else {
    wrongGuess(guessedLetter);
  }

  inputField.value = "";
  inputField.focus();
}

// Handle wrong guess
function wrongGuess(guessedLetter) {
  wrongGuesses += 0.2;
  shrinkImage();
  document.getElementById("wrongLetters").textContent += `${guessedLetter}`;
  document.getElementById("wrongSound").play(); // Play wrong sound

  if (wrongGuesses >= maxMistakes) {
    endGame(false);
  }
}

// Handle correct guess
function correctGuess(guessedLetter) {
  let newDisplayedWord = "";
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] == guessedLetter) slots[i] = guessedLetter;
  }

  displayedWord = newDisplayedWord;
  document.getElementById("wordDisplay").textContent = slots.join(" ");

  document.getElementById("correctSound").play();

  if (!slots.includes("_")) {
    endGame(true);
  }
}

// End the game
function endGame(won) {
  if (won === true) {
    winCount++; // Increment win count
    setTimeout(() => {
      showModal("You won! 🎉", "success");
    }, 100);
  } else if (won === false) {
    lossCount++; // Increment loss count
    setTimeout(() => {
      showModal("You lost! Try again 😞", "danger");
    }, 100);
  }
  updateScore(); // Update the score display after the game ends
}

// Show modal for win/loss
function showModal(message, type) {
  const modal = document.getElementById("winLossModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  modal.classList.add(type);
  modal.style.display = "flex"; // Display the modal
}

// Close modal
function closeModal() {
  const modal = document.getElementById("winLossModal");
  modal.style.display = "none"; // Hide the modal
  restartGame();
}

// Restart the game
function restartGame() {
  document.getElementById("difficultySelection").classList.remove("d-none");
  document.getElementById("gameArea").classList.add("d-none");
  document.getElementById("difficultyBox").classList.add("d-none");

  selectedWord = "";
  displayedWord = "";
  wrongGuesses = 0;
  guessedLetters = [];
  document.getElementById("wordDisplay").textContent = "";
  document.getElementById("wrongLetters").textContent = "Wrong Guesses: ";
  document.getElementById("letterInput").value = "";

  const img = document.getElementById("shamrock");
  img.style.width = "auto";
  img.style.height = "auto";

  updateScore();
}

// Shrink the shamrock image with each wrong guess
function shrinkImage() {
  const img = document.getElementById("shamrock");
  const currentWidth = img.clientWidth;
  const currentHeight = img.clientHeight;

  // Calculate new dimensions
  const newWidth = currentWidth * 0.85;
  const newHeight = currentHeight * 0.85;

  // Apply new dimensions
  img.style.width = newWidth + "px";
  img.style.height = newHeight + "px";
}

// Update the score display
function updateScore() {
  localStorage.setItem("winCount", winCount);
  localStorage.setItem("lossCount", lossCount);
  document.getElementById("winCount").textContent = winCount;
  document.getElementById("lossCount").textContent = lossCount;
}

// Listen for the Enter key to submit a guess
window.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    guessLetter(); // Calls the guessLetter function when Enter is pressed
  }
});

// Modal functionality for win/loss display
document.getElementById("winLossModal").addEventListener("click", closeModal);

// Modal style (in CSS)
document.getElementById("winLossModal").style.display = "none";

window.onload = () => {
  localStorage.setItem("winCount", 0);
  localStorage.setItem("lossCount", 0);
  updateScore();
};