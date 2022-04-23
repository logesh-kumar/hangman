const programmingLanguages = [
  "python",
  "java",
  "javascript",
  "php",
  "ruby",
  "swift",
  "go",
  "scala",
  "kotlin",
  "haskell",
  "clojure",
  "erlang",
  "lua",
  "rust",
  "typescript",
  "assembly",
];

// Get a random word from the array`
const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * programmingLanguages.length);
  return programmingLanguages[randomIndex];
};

const randomWord = getRandomWord();

console.log({ randomWord });

const guessedLetters = Array(randomWord.length).fill("_");

// Get the length of the word`
const getWordLength = (word) => {
  return word.length;
};

// create empty divs for the game`
const createEmptyDivs = () => {
  const wordLength = getWordLength(randomWord);

  for (let i = 0; i < wordLength; i++) {
    const div = document.createElement("div");
    div.classList.add("letter");
    div.innerHTML = "_";
    div.setAttribute("data-letter", "_");
    div.setAttribute("data-index", i);
    document.querySelector(".word").appendChild(div);
  }
};

const replaceLetter = (letter) => {
  const wordLength = getWordLength(randomWord);
  for (let i = 0; i < wordLength; i++) {
    if (randomWord[i] === letter) {
      guessedLetters[i] = letter;
      const letterDiv = document.querySelectorAll(".letter");
      letterDiv[i].innerHTML = letter;
    }
  }
};

// Create a function to check if the letter is in the word`
const checkLetter = (letter, word) => {
  const wordLength = getWordLength(word);
  let letterInWord = false;
  for (let i = 0; i < wordLength; i++) {
    if (word[i] === letter) {
      letterInWord = true;
    }
  }
  return letterInWord;
};

// Create a function to check if the letter is already in the guessed letters`
const checkGuessedLetter = (letter, guessedLetters) => {
  let letterInGuessedLetters = false;
  for (let i = 0; i < guessedLetters.length; i++) {
    if (guessedLetters[i] === letter) {
      letterInGuessedLetters = true;
    }
  }
  return letterInGuessedLetters;
};

// Create a function to check if the letter is in the word`
const checkWord = (word, guessedLetters) => {
  const wordLength = getWordLength(word);
  let wordGuessed = true;
  for (let i = 0; i < wordLength; i++) {
    if (word[i] !== guessedLetters[i]) {
      wordGuessed = false;
    }
  }
  return wordGuessed;
};

// Create a function to check if the game is over`
const checkLives = (lives) => {
  let gameOver = false;
  if (lives === 0) {
    gameOver = true;
  }
  return gameOver;
};

let lives = document.querySelector(".lives").textContent;

// create alpahbet buttons`
const createAlphabetButtons = () => {
  const alphabetDiv = document.querySelector(".alphabets");
  const alphabetButtons = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  for (let i = 0; i < alphabetButtons.length; i++) {
    const button = document.createElement("button");
    button.textContent = alphabetButtons[i];
    button.classList.add("alphabet-button");
    button.addEventListener("click", handleAlphabetClick(i));
    alphabetDiv.appendChild(button);
  }
};

function handleAlphabetClick(i) {
  return (event) => {
    const letter = event.target.textContent;
    const letterInWord = checkLetter(letter, randomWord);
    const letterInGuessedLetters = checkGuessedLetter(letter, guessedLetters);

    if (letterInWord && !letterInGuessedLetters) {
      replaceLetter(letter);
    } else {
      lives--;
      generateHangman();
      document.querySelector(".lives").innerHTML = lives;
    }

    if (checkWord(randomWord, guessedLetters)) {
      setTimeout(() => {
        alert("You won!");
      });
    }

    if (checkLives(lives)) {
      setTimeout(() => {
        alert("You lost!");
      });
    }
  };
}

// generate hangman`
function generateHangman() {
  switch (lives) {
    case 5:
      document.querySelector("#head").classList.remove("hide");
      break;
    case 4:
      document.querySelector("#bodyLine").classList.remove("hide");
      break;
    case 3:
      document.querySelector("#armL").classList.remove("hide");
      break;
    case 2:
      document.querySelector("#armR").classList.remove("hide");
      break;
    case 1:
      document.querySelector("#legL").classList.remove("hide");
      break;
    case 0:
      document.querySelector("#legR").classList.remove("hide");
      break;
    default:
      break;
  }
}

createEmptyDivs();
createAlphabetButtons();
