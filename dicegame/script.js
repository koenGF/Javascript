"use strict";

const rollDiceButton = document.querySelector(".btn--roll");
const diceImg = document.querySelector(".dice");

console.log(rollDiceButton);

rollDiceButton.addEventListener("click", rollDice)

function rollDice(){
    const currentRoll = Math.floor(Math.random() * 6 + 1);
    diceImg.src = `dice-${currentRoll}.png`; //template literal
    console.log(currentRoll);
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
