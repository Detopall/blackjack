"use strict";

const _winning = "W";
const _draw = "D";
const _losing = "L";
let _gameRunning = false;

let _W = loadFromStorage("W");
let _D = loadFromStorage("D");
let _L = loadFromStorage("L");

let _money = loadFromStorage("money");
let _wager = loadFromStorage("wager");

loadOnReload();

document.addEventListener("click", actions);
document.addEventListener("click", replayGame);
document.addEventListener("click", resetGame);
document.addEventListener("click", checkIfPayed);
document.addEventListener("click", increaseOrDecreaseWager);
document.addEventListener("click", wagerAllIn);
document.addEventListener("click", wagerZero);

document.addEventListener("click", checkOver21Player);
document.addEventListener("click", saveData);



document.querySelectorAll("#player .actions button").forEach(btn => {
	btn.disabled = true;
});
