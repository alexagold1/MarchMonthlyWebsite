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

// setting game variables

let selectedWord = "";
let displayedWord = "";
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

function startGame(level) {
  selectedWord = getRandomWord(level);

  // update difficulty display div
  updateDifficultyDisplay(level);

  //   create the placeholder for the selected word
  displayedWord = "_".repeat(selectedWord.length);
  //display the updated word
  document.getElementById("wordDisplay").textContent = displayedWord
    .split("")
    .join("");

  // hide difficulty selection and show game name area

  // add d block to the #difficultyselection
  document.getElementById("difficultySelection").classList.add("d-none");
  // remove d-none from difficulty box & #gamearea
  document.getElementById("gameArea").classList.remove("d-none");
  document.getElementById("difficultyBox").classList.remove("d-none");
  // add d-block to #difficultyBox & #gameArea

  document.getElementById("gameArea").classList.add("d-block");
  document.getElementById("difficultyBox").classList.add("d-block");
}

function getRandomWord(level) {
  let filteredWords = wordList.filter((word) => {
    if (level === "easy") return word.length <= 4;
    if (level === "medium") return word.length >= 5 && word.length <= 7;
    if (level === "hard") return word.length >= 8;
  });

  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById("difficultyBox");

  // remove any previous difficulty classes
  difficultyBox.classList.remove("easy", "medium", "hard");

  // set text & apply class dynamically using template literals

  difficultyBox.textContent = `Difficulty: ${
    level.charAt(0).toUpperCase() + level.slice(1)
  }`;

  difficultyBox.classList.add(level);
}

function guessLetter() {
  let inputField = document.getElementById("letterInput"); //Get input field
  let guessedLetter = inputField.value.toLowerCase(); //convert input to lowercase

  // check if input is a valid letter (a-z)
  if (!guessedLetter.match(/^[a-z]$/)) {
    alert("Please enter a valid letter (a-z)!");
    inputField.value = "";
    return;
  }

  //check if letter was already guessed

  if (guessedLetters.includes(guessedLetter)) {
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`);
    inputField.value = "";
    return;
  } else {
    guessedLetters.push(guessedLetter);
  }

  if (selectedWord.includes(guessedLetters)) {
    correctGuess(guessedLetter);
  } else {
    wrongGuess(guessedLetter);
  }

  inputField.value = "";
  inputField.focus();
}

function wrongGuess(guessedLetter) {
  // incrament the num of wrong guess
  wrongGuesses++;

  // add the guessed letter to the HTML div
  document.getElementById("wrongLetters").textContent += `${guessedLetter}`;

  document.getElementById("shamrock").src = `imgs/shamrock${
    6 - wrongGuesses
  }.jpg`;

  // check to see if the num of wrongGuesses === the maxMistakes if it is, call endGame(false)
  if (wrongGuesses === maxMistakes) {
    endGame(false);
  }
}

function correctGuess(guessedLetter) {
  let newDisplayedWord = "";

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayedWord += guessedLetter;
    } else {
      newDisplayedWord += displayedWord[i];
    }
  }

  displayedWord = newDisplayedWord;
  document.getElementById("wordDisplay").textContent = displayedWord
    .split("")
    .join("");

  if (!displayedWord.includes("_")) {
    endGame(true);
  }
}

function correctGuess(guessedLetter) {}
function endGame(won) {
  if (won === true) {
    setTimeout(() => alert("yay!! you won!"), 100);
  } else (won === false){
    setTimeout(() => alert("aw you lose. try again!"), 100);
  }
}

function restartGame() {
  location.reload();
}
