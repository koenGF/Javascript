"use strict";

/* HTML-ELEMENTEN PER GAME-ATTRIBUUT */
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");
const diceImg = document.querySelector(".dice");

/* HTML-ELEMENTEN PER SPELER*/
const player0BankScoreElement = document.querySelector("#score--0");
const player1BankScoreElement = document.querySelector("#score--1");
const player0CurrentScoreElement = document.querySelector("#current--0");
const player1CurrentScoreElement = document.querySelector("#current--1");
const player0SectionElement = document.querySelector(".player--0");
const player1SectionElement = document.querySelector(".player--1");

/* GAME-SETUP */
let currentScorePlayer0;
let currentScorePlayer1;
let bankScorePlayer0;
let bankScorePlayer1;
let activeGame;
let currentPlayer;

/* ADD EVENTLISTENERS TO GAME-ATTRIBUTEN */
rollDiceButton.addEventListener("click", rollDice);
holdButton.addEventListener("click", actionHoldButton);
newGameButton.addEventListener("click", newGame);

/* NEW GAME */
newGame();

/* FUNCTIONS */
function newGame() {
    resetClasses();
    gameSetup();
    resetHTMLElements();
}
function resetClasses(){
    player0SectionElement.classList.add("player--active");
    player1SectionElement.classList.remove("player--active");
    player0SectionElement.classList.remove("player--winner");
    player1SectionElement.classList.remove("player--winner");
}
function gameSetup(){
    currentScorePlayer0 = 0;
    currentScorePlayer1 = 0;
    bankScorePlayer0 = 0;
    bankScorePlayer1 = 0;
    currentPlayer = 0;
    activeGame = true;
}
function resetHTMLElements(){
    player0CurrentScoreElement.textContent = currentScorePlayer0;
    player1CurrentScoreElement.textContent = currentScorePlayer1;
    player0BankScoreElement.textContent = bankScorePlayer0;
    player1BankScoreElement.textContent = bankScorePlayer1;
}

/* GAME LOGIC */
function rollDice(){
    if (!activeGame) return;
    const currentRoll = rollDiceAndChangeImage();
    processScore(checkScore(currentRoll), currentRoll);
}

function rollDiceAndChangeImage(){
    let currentRoll = Math.floor(Math.random() * 6 + 1);
    diceImg.src = `dice-${currentRoll}.png`;
    return currentRoll;
}

function checkScore(score){
    return (score !== 1);
}
function processScore(correct, currentRoll){
    (correct) ? addToScoreCorrectPlayer(currentRoll): switchPlayer();
}
function addToScoreCorrectPlayer(currentRoll){
    (currentPlayer === 0) ? addScoreToPlayerZero(currentRoll) : addScoreToPlayerOne(currentRoll);
}
function addScoreToPlayerZero (currentRoll){
    currentScorePlayer0 += currentRoll;
    player0CurrentScoreElement.textContent = currentScorePlayer0;
}
function addScoreToPlayerOne(currentRoll){
    currentScorePlayer1 += currentRoll;
    player1CurrentScoreElement.textContent = currentScorePlayer1;
}

function switchPlayer (){
    currentPlayer = (currentPlayer === 0) ? 1 : 0;
    resetCurrentScores();
    toggleActivePlayerBackground();
}
function resetCurrentScores(){
    currentScorePlayer0 = 0; currentScorePlayer1 = 0;
    player0CurrentScoreElement.textContent = currentScorePlayer0;
    player1CurrentScoreElement.textContent = currentScorePlayer1;
}
function toggleActivePlayerBackground() {
    player0SectionElement.classList.toggle("player--active");
    player1SectionElement.classList.toggle("player--active");
}

function actionHoldButton() {
    addToBank();
    winCheck();
    switchPlayer();
}
function addToBank() {
    if (!activeGame) return;
    (currentPlayer === 0) ? addToPlayer0Bank() : addToPlayer1Bank();
}
function addToPlayer0Bank() {
    bankScorePlayer0 += currentScorePlayer0;
    player0BankScoreElement.textContent = bankScorePlayer0;
}
function addToPlayer1Bank() {
    bankScorePlayer1 += currentScorePlayer1;
    player1BankScoreElement.textContent = bankScorePlayer1;
}

function winCheck() {
    (currentPlayer === 0) ? winCheckPlayer0() :  winCheckPlayer1();
}
function winCheckPlayer0() {
    if (bankScorePlayer0 >= 60) {
        player0SectionElement.classList.add("player--winner");
        activeGame = false;
    }
}
function winCheckPlayer1() {
    if (bankScorePlayer1 >= 60) {
        player1SectionElement.classList.add("player--winner");
        activeGame = false;
    }
}