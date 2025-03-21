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
let displayWord = "";
let wrongGuess = 0;
let guessedLetters = [];
const maxMistakes = 6;

function startGame(level) {
  selectedWord = getRandomWord(level);

  // update difficulty display div
  updateDifficultyDisplay(level);

  //   create the placeholder for the selected word
  displayWord = "_".repeat(selectedWord.length);
  //display the updated word
  document.getElementById("wordDisplay").textContent = displayWord
    .split("")
    .join(" ");

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
