"use strict";

const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");
const diceImg = document.querySelector(".dice");
let currentPlayer = 0;

console.log(newGameButton);
//ELEMENTEN
const player0ScoreElement = document.querySelector("#score--0");
const player1ScoreElement = document.querySelector("#score--1");
const player0CurrentElement = document.querySelector("#current--0");
const player1CurrentElement = document.querySelector("#current--1");
const player0SectionElement = document.querySelector(".player--0");
const player1SectionElement = document.querySelector(".player--1");
//SCORES
let currentScorePlayer0 = 0;
let currentScorePlayer1 = 0;
let bankScorePlayer0 = 0;
let bankScorePlayer1 = 0;
let activeGame = true;

rollDiceButton.addEventListener("click", rollDice);
holdButton.addEventListener("click", addToBank);
newGameButton.addEventListener("click", newGame);

function rollDice(){
    if (!activeGame) return;
    const currentRoll = Math.floor(Math.random() * 6 + 1);
    diceImg.src = `dice-${currentRoll}.png`; //template literal
    //optellen bij de currentScore
    //player0CurrentElement.textContent = currentScorePlayer0;

    //misschien overzichtelijker met eerst player 0/1, daarna roll 1/2-6. kan handiger
    //ook goed om te weten voor winsituatie en hold
    if (currentRoll === 1) {
        switchPlayer();
    }
    else {
        if (currentPlayer === 0) {
            currentScorePlayer0 += currentRoll;
            player0CurrentElement.textContent = currentScorePlayer0;
        } else {
            currentScorePlayer1 += currentRoll;
            player1CurrentElement.textContent = currentScorePlayer1;
        }
    }
    console.log(currentRoll);
}

function switchPlayer (){
    currentPlayer = (currentPlayer === 0) ? 1 : 0; //ternary => opzoeken
    resetCurrentScores();
    player0SectionElement.classList.toggle("player--active");
    player1SectionElement.classList.toggle("player--active");
}
function resetCurrentScores(){
    currentScorePlayer0 = 0; currentScorePlayer1 = 0;
    player0CurrentElement.textContent = currentScorePlayer0;
    player1CurrentElement.textContent = currentScorePlayer1;
}

function addToBank() {
    if (currentPlayer === 0) {
        bankScorePlayer0 += currentScorePlayer0;
        player0ScoreElement.textContent = bankScorePlayer0;
        switchPlayer();
    } else {
        bankScorePlayer1 += currentScorePlayer1;
        player1ScoreElement.textContent = bankScorePlayer1;
        switchPlayer();
    }
    winCheck();
}

function winCheck() {
    if (currentPlayer !== 0) {
        if (bankScorePlayer0 >= 10) {
            player0SectionElement.classList.add("player--winner");
            activeGame = false;
        }
    } else {
        if (bankScorePlayer1 >= 10) {
            player1SectionElement.classList.add("player--winner");
            activeGame = false;
        }
    }
}

function newGame() {
    currentScorePlayer0 = 0;
    currentScorePlayer1 = 0;
    bankScorePlayer0 = 0;
    bankScorePlayer1 = 0;
    player0CurrentElement.textContent = currentScorePlayer0;
    player1CurrentElement.textContent = currentScorePlayer1;
    player0ScoreElement.textContent = bankScorePlayer0;
    player1ScoreElement.textContent = bankScorePlayer1;
    currentPlayer = 0;
    player0SectionElement.classList.add("player--active");
    player1SectionElement.classList.remove("player--active");
    player0SectionElement.classList.remove("player--winner");
    player1SectionElement.classList.remove("player--winner");
    activeGame = true;
}
/* reset bank & current

ROLL DICE
roll dice (1-6)
1: reset current, change player
2-6: add to current-->

HOLD
add current to bank, clear current
>=60? end game


wie aan de beurt
score aan speler toevoegen
wissel speler bij 1
*/
