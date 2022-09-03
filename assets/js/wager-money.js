"use strict";

function checkIfPayed(e){
	e.preventDefault();
	const wagerBtn = document.querySelector("#wager-btn");
	if (parseInt(_wager) > parseInt(_money) || e.target !== wagerBtn) return;

	enableActionButtons();
	startGame();
	wagerBtn.disabled = true;
	
}

function startGame(){
	const player = document.querySelector("#player .cards p");
	const dealer = document.querySelector("#dealer .cards p");
	player.innerHTML = "";
	player.insertAdjacentHTML("beforeend", drawCard()+randomInt());

	dealer.innerHTML = "";
	dealer.insertAdjacentHTML("beforeend", drawCard());
	_gameRunning = true;
}

function increaseOrDecreaseWager(e){
	if (e.target.closest("#up")){
		if (parseInt(_money) <= parseInt(_wager)) return;
 		decideOnWager(100);
	} else if (e.target.closest("#down")){
		if (parseInt(_money) === 0 || parseInt(_wager) <= 0) return;
		decideOnWager(-100);
	}
}

function decideOnWager(wagerDecision){
	localStorage.setItem("wager", `${parseInt(_wager) + wagerDecision}`);
	location.reload();
}

function enableActionButtons(){
	document.querySelectorAll("#player .actions button").forEach(btn => {
		btn.disabled = false;
	});
}