"use strict";

//selecting elements
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
let currentScore0Element = document.getElementById("current--0");
let currentScore1Element = document.getElementById("current--1");
let player0Section = document.querySelector(".player--0");
let player1Section = document.querySelector(".player--1");
const diceImg = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const difficulty1Btn = document.querySelector(".difficulty-1");
const difficulty2Btn = document.querySelector(".difficulty-2");
const difficulty3Btn = document.querySelector(".difficulty-3");
const difficultyBtns = [difficulty1Btn, difficulty2Btn, difficulty3Btn];

//Global variables
let activePlayer, playing, currentScore, score, difficulty;

//togglling active player function
const activePlayerToggle = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Section.classList.toggle("player--active");
  player1Section.classList.toggle("player--active");
};

//reassigning current score function
const currentScoreReassignment = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

//initialize the game again button
newGameBtn.addEventListener("click", () => {
  init(difficulty);
});

//rolling the dice button
rollBtn.addEventListener("click", function () {
  if (playing) {
    //producing random number
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${dice}.png`;
    const condition =
      difficulty === 1
        ? dice !== 1
        : difficulty === 2
        ? dice !== 1 && dice !== 4
        : dice !== 1 && dice !== 3 && dice !== 5;
    if (condition) {
      //continue rolling the dice if dice is not equal to 1
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //reset current score and toggle players if dice is equal to 1
      currentScoreReassignment();
      activePlayerToggle();
    }
  }
});

//change difficulty event listener
document.querySelector("body").addEventListener("click", (event) => {
  if (!event.target.classList.contains("difficulty-btns")) return;
  if (event.target.classList.contains("difficulty-1")) {
    init(1);
  } else if (event.target.classList.contains("difficulty-2")) {
    init(2);
  } else {
    init(3);
  }
});

//holding the points button
holdBtn.addEventListener("click", function () {
  if (playing) {
    //add up points and reassigning current score
    score[activePlayer] += currentScore;
    currentScoreReassignment();
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      //stop playing and highlight winner if score of active player is more than 100 points
      diceImg.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(".player--active");
      playing = false;
    } else {
      //togglling player after holding the points if active player is less than 100 points
      activePlayerToggle();
    }
  }
});

//starting rules initializing function
const init = function (level = 1) {
  activePlayer = 0;
  currentScore = 0;
  score = [0, 0];
  playing = true;
  difficulty = level;
  currentScore0Element.textContent = currentScore;
  currentScore1Element.textContent = currentScore;
  score0Element.textContent = score[0];
  score1Element.textContent = score[1];
  player0Section.classList.remove("player--winner");
  player1Section.classList.remove("player--winner");
  player0Section.classList.add("player--active");
  player1Section.classList.remove("player--active");
  diceImg.classList.add("hidden");
  difficultyBtns.forEach((btn, index, array) => {
    btn.classList.remove("active-level");
    array[difficulty - 1].classList.add("active-level");
  });
};

//calling init function
init();

// instructions MODAL
//Modal Selectors
let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");
let btnCloseModal = document.querySelector(".close-modal");
let showModalBtn = document.querySelector(".show-modal");

//show Modal event listener
showModalBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

//close Modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//clode Modal event listeners
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (pressed) {
  if (pressed.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
