"use strict";

function drawCard(){ 
	const time = new Date().getMilliseconds();
	const lengthOfTime = time.toString().length;
	return Math.round(time / Math.pow(10, (lengthOfTime - 1)));
}

function randomInt() { // different random method than drawCard
	return Math.floor(Math.random() * (10 - 1 + 1) + 1)
}

