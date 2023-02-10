"use strict";

function checkOver21Player(){
	if (!_gameRunning) return;
	const playerValue = parseInt(document.querySelector("#player .cards p").innerHTML);
	if (playerValue === 21) {standAction(); return;}
	if (playerValue < 21) return;
	saveData();
	userOutcome(_losing);
	_gameRunning = false;
}

function actions(e){
	const player = document.querySelector("#player .cards p");
	if (e.target.innerHTML === "HIT"){
		hitAction(player);
	}

	if (e.target.innerHTML === "STAND"){
		standAction();
	}

	if (e.target.innerHTML === "SURRENDER"){
		userOutcome(_losing);
		location.reload();
	}
}

function hitAction(target){
	let cardValue = parseInt(target.innerHTML);
	let newCard = drawCard();
	target.innerHTML = "";
	target.insertAdjacentHTML("beforeend", cardValue + newCard);
	saveData();
}

function standAction(){
	document.querySelectorAll("#player .actions button").forEach(btn => {
		btn.disabled = true;
	});
	startGameDealer();
}

function startGameDealer(){
	const dealer = document.querySelector("#dealer .cards p");
	while (loadFromStorage("dealerValue") < 17){
		hitAction(dealer);
	}
	checkOutcome();
}
