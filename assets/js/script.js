"use strict";

document.addEventListener("DOMContentLoaded", init);

const _winning = "W";
const _draw = "D";
const _losing = "L";
let _gameRunning = false;

let _W = localStorage.getItem("W");
let _D = localStorage.getItem("D");
let _L = localStorage.getItem("L");

let _money = localStorage.getItem("money");
let _wager = localStorage.getItem("wager");

function init(){
	saveData();
	checkLocalStorage();
	displayScore();
	displayMoney();
	checkIfEnoughMoney();
	document.addEventListener("click", actions);
	document.addEventListener("click", checkOver21Player);
	document.addEventListener("click", replayGame);
	document.addEventListener("click", saveData);
	document.addEventListener("click", resetGame);
	document.addEventListener("click", checkIfPayed);
	document.addEventListener("click", increaseOrDecreaseWager);
	document.querySelectorAll("#player .actions button").forEach(btn => {
		btn.disabled = true;
	});
}

function checkOver21Player(e){
	e.preventDefault();
	if (!_gameRunning) return;
	const playerValue = parseInt(document.querySelector("#player .cards p").innerHTML);
	if (playerValue === 21) {standAction(e); return;}
	if (playerValue < 21) return;
	saveData();
	userOutcome(_losing);
	_gameRunning = false;
}

function checkLocalStorage(){
	if (_W === null || _D === null || _L === null) {
		localStorage.setItem("W", 0);
		localStorage.setItem("D", 0);
		localStorage.setItem("L", 0);
	}
	
	if (_money === null) {
		localStorage.setItem("money", 1000);
	}

	if (_wager === null){
		localStorage.setItem("wager", 100);
	}
}

function saveData(){
	const playerValue = parseInt(document.querySelector("#player .cards p").innerHTML);
	const dealerValue = parseInt(document.querySelector("#dealer .cards p").innerHTML);
	saveToStorage("playerValue", playerValue);
	saveToStorage("dealerValue", dealerValue);
}

function displayScore(){
	let score = document.querySelector("#score");
	score.innerHTML = "";
	let html = `<span>W: ${_W} -- </span>
				<span>L: ${_L} -- </span>
				<span>D: ${_D} </span>
				<br>
				<button type='button'> Refresh game </button>`;
	score.insertAdjacentHTML("beforeend", html);
}

function displayMoney(){
	let wagerDiv = document.querySelector("#wager");
	wagerDiv.innerHTML = "";
	let html = `<span>$${_money}</span>
				<br>
				<button type='button' id='wager-btn'> Wager money ($${_wager}) </button>
				<br>
				<button type='button' id='up'> &#8593; </button>
				<button type='button' id='down'> &#8595; </button>`;
	wagerDiv.insertAdjacentHTML("beforeend", html);
}

function resetGame(e){
	e.preventDefault();
	if (!e.target.closest("#score button")) return;
	localStorage.setItem("W", 0);
	localStorage.setItem("D", 0);
	localStorage.setItem("L", 0);
	localStorage.setItem("money", 1000);
	localStorage.setItem("wager", 100);
	location.reload();
}

function checkIfEnoughMoney(){
	if (_money > 0) return;

	const main = document.querySelector("main");
	const score = document.querySelector("#score");

	main.classList.add("hidden");
	const insufficientFunds = `<img class="insufficient-funds" src="/images/insufficient-funds.png" alt="insufficient-funds" title="insufficient-funds">`;
	score.insertAdjacentHTML("afterend", insufficientFunds);
}