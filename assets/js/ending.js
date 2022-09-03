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

	localStorage.setItem(`${outcome}`, parseInt(localStorage.getItem(`${outcome}`))+1);
	checkWagerOutcome(outcome);
	_gameRunning = false;
}

function checkWagerOutcome(outcome){
	console.log(outcome);
	if (outcome === "W") {
		getWagerMoney(1);
	} else if (outcome === "L") {
		getWagerMoney(-1);
	} else {
		getWagerMoney(0);
	}
}

function getWagerMoney(outcome){
	let currentMoney = document.querySelector("#wager span");
	currentMoney.innerHTML = `$${parseInt(_money) + (parseInt(outcome)*parseInt(_wager))}`;
	localStorage.setItem(`money`, parseInt(localStorage.getItem(`money`))+(outcome*parseInt(_wager)));
} 

function replayGame(e){
	e.preventDefault();
	if (!e.target.closest("#outcome button")) return;
	location.reload();
}

