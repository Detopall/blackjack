"use strict";

function loadOnReload(){
	//checkIfWagerIsHigher();
	saveData();
	checkLocalStorage();
	displayScore();
	displayMoney();
	checkIfEnoughMoney();
}

/*function checkIfWagerIsHigher(){
	if (_wager > _money){
		saveToStorage("money", parseInt(_wager));
	}
}
*/

function saveData(){
	const playerValue = parseInt(document.querySelector("#player .cards p").innerHTML);
	const dealerValue = parseInt(document.querySelector("#dealer .cards p").innerHTML);
	saveToStorage("playerValue", playerValue);
	saveToStorage("dealerValue", dealerValue);
}


function checkLocalStorage(){
	if (_W === null || _D === null || _L === null) {
		saveToStorage("W", 0);
		saveToStorage("D", 0);
		saveToStorage("L", 0);
	}
	
	if (_money === null) {
		saveToStorage("money", 1000);
	}

	if (_wager === null){
		saveToStorage("wager", 100);
	}
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
				<div class="wager-buttons">
					<button id="zero">0</button>
					<button id='down'> &#8595; </button>
					<button id='up'> &#8593; </button>
					<button id="all-in">All In</button>
				<div>`;
	wagerDiv.insertAdjacentHTML("beforeend", html);
}

function checkIfEnoughMoney(){
	if (parseInt(_money) > 0) return;

	const main = document.querySelector("main");
	const score = document.querySelector("#score");

	main.classList.add("hidden");
	const insufficientFunds = `<img class="insufficient-funds" src="/images/insufficient-funds.png" alt="insufficient-funds" title="insufficient-funds">`;
	score.insertAdjacentHTML("afterend", insufficientFunds);
}
