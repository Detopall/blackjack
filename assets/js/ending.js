"use strict";

function checkOutcome(){
	const playerValue = parseInt(document.querySelector("#player .cards p").innerHTML);
	const dealerValue = parseInt(document.querySelector("#dealer .cards p").innerHTML);
	if (dealerValue > playerValue && dealerValue <= 21) {userOutcome(_losing);}
	if (dealerValue > 21) {userOutcome(_winning);}
	if (dealerValue === playerValue) {userOutcome(_draw);}
	if (dealerValue < playerValue) {userOutcome(_winning);}
}

function userOutcome(outcome){
	document.querySelectorAll("#player .actions button").forEach(btn => {
		btn.disabled = true;
	});
	document.querySelector("#outcome").classList.remove("hidden");
	document.querySelector(`#outcome img[alt='${outcome}']`).classList.remove("hidden");

	localStorage.setItem(`${outcome}`, parseInt(loadFromStorage(`${outcome}`))+1);
	checkWagerOutcome(outcome);
	_gameRunning = false;
}

function checkWagerOutcome(outcome){
	console.log(outcome);
	if (outcome === _winning) {
		getWagerMoney(1);
	} else if (outcome === _losing) {
		getWagerMoney(-1);
	} else {
		getWagerMoney(0);
	}
	document.querySelector("#try-again").classList.remove("hidden");
}

function getWagerMoney(outcome){
	let currentMoney = document.querySelector("#wager span");
	currentMoney.innerHTML = `$ ${parseInt(_money) + (parseInt(outcome)*parseInt(_wager))}`;
	saveToStorage("money", parseInt(loadFromStorage("money"))+(outcome*parseInt(_wager)));
}

function replayGame(e){
	e.preventDefault();
	if (!e.target.closest("#try-again")) return;
	location.reload();
}

function resetGame(e){
	e.preventDefault();
	if (!e.target.closest("#score button")) return;
	saveToStorage("W", 0);
	saveToStorage("D", 0);
	saveToStorage("L", 0);
	saveToStorage("money", 1000);
	saveToStorage("wager", 100);
	location.reload();
}
