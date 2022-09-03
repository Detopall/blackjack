"use strict";

function actions(e){
	const player = document.querySelector("#player .cards p");
	if (e.target.innerHTML === "HIT"){
		hitAction(e, player);
	}

	if (e.target.innerHTML === "STAND"){
		standAction(e);
	}

	if (e.target.innerHTML === "SURRENDER"){
		userOutcome(_losing);
		location.reload();
	}
}

function hitAction(e, target){
	e.preventDefault();
	let cardValue = parseInt(target.innerHTML);
	let newCard = drawCard();
	target.innerHTML = "";
	target.insertAdjacentHTML("beforeend", cardValue + newCard);
	saveData();
}

function standAction(e){
	e.preventDefault();
	document.querySelectorAll("#player .actions button").forEach(btn => {
		btn.disabled = true;
	});
	startGameDealer(e);
}

function startGameDealer(e){
	const dealer = document.querySelector("#dealer .cards p");
	while (loadFromStorage("dealerValue") < 17){
		hitAction(e, dealer);
	}
	checkOutcome();
}
