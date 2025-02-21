'use strict';
//  Scoreboard modified by Mark Joseph Orino
//  Based on G4ScoreBoard addon for OBS version 1.6.0 Copyright 2022 Norman Gholson IV

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//										variable declarations
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			

const bcr = new BroadcastChannel('mj-recv'); // browser_source -> control_panel channel 
const bc = new BroadcastChannel('mj-main');
var playerNumber;
var tempL = 5;
var tempR = 5;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//										broadcast channel events
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			

bc.onmessage = (event) => {
	if (event.data.animate == 1) {
		if (event.data.player == 1){
			console.log("addends received: " + event.data.addend);
			if (event.data.opt == "add"){
				const symbol1 = document.getElementById("symbol1");
				symbol1.innerHTML = "+" + event.data.addend;
			} else {
				const symbol1 = document.getElementById("symbol1");
				symbol1.innerHTML = "-  " + event.data.addend;
			}
			const upperContainer = document.querySelector(".upperContainer");
			const upper = upperContainer.querySelector(".upper");
			const sentScore1 = upperContainer.querySelector(".sentScore1");
			const score1 = upperContainer.querySelector(".score1");
			setTimeout(() => {
				upper.classList.add("animate");
			}, 1000);
			setTimeout(() => {
				sentScore1.classList.add("animate");
				score1.style.visibility = "hidden";
			}, 1500);
			setTimeout(() => {
				score1.style.visibility = "visible";
				score1.classList.add("animate");
				upper.classList.remove("animate");
			}, 1900);
			setTimeout(() => {
				sentScore1.classList.remove("animate");
			},2200)
			setTimeout(() => {
				score1.classList.remove("animate");
			},2700)
		} else {
			if (event.data.opt == "add"){
				const symbol2 = document.getElementById("symbol2");
				symbol2.innerHTML = "+" + event.data.addend;
			} else {
				const symbol2 = document.getElementById("symbol2");
				symbol2.innerHTML = "-  " + event.data.addend;
			}
			const lowerContainer = document.querySelector(".lowerContainer");
			const lower = lowerContainer.querySelector(".lower");
			const sentScore2 = lowerContainer.querySelector(".sentScore2");
			const score2 = lowerContainer.querySelector(".score2");
			
			setTimeout(() => {
				lower.classList.add("animate");
			}, 1000);
			setTimeout(() => {
				sentScore2.classList.add("animate");
				score2.style.visibility = "hidden";
			}, 1500);
			setTimeout(() => {
				score2.style.visibility = "visible";
				score2.classList.add("animate");
				lower.classList.remove("animate");
			}, 1900);
			setTimeout(() => {
				sentScore2.classList.remove("animate");
			},2200)
			setTimeout(() => {
				score2.classList.remove("animate");
			},2700)
		}
	}
	if (event.data.score != null) {
		console.log("event.data.player: " + event.data.player + "  event.data.score: " + event.data.score);
		if (event.data.score > document.getElementById("player" + event.data.player + "Score").innerHTML) {
			const subsOdometer = document.getElementById("player" + event.data.player + "Score");
			// const odometer = new Odometer({
			// el: subsOdometer,
			// })
			// // odometer.update(10864);
			subsOdometer.innerHTML = event.data.score;
		} else {
			const subsOdometer = document.getElementById("player" + event.data.player + "Score");
			// const odometer = new Odometer({
			// el: subsOdometer,
			// })

			// // odometer.update(10864);
			subsOdometer.innerHTML = event.data.score;
		}
	}
	const foulValue = event.data.foulValue;
	if (foulValue != null){
		console.log("event.data.player: " + event.data.player + "  event.data.foulValue: " + event.data.foulValue);
		const player = event.data.player;
		var loc = "";
		if (player == 1){
			loc = "L";
			console.log("temp:" + tempL + " foulValue: " + foulValue);
			if (foulValue < tempL){
				console.log("blink");
				blinkImg("img" + loc, foulValue);
				tempL = foulValue;
			} else {
				document.getElementById("img" + loc + foulValue).style.visibility = "visible";
				tempL = foulValue;
			}
		} else {
			loc = "R";
			console.log("temp:" + tempR + " foulValue: " + foulValue);
			if (foulValue < tempR){
				console.log("blink");
				blinkImg("img" + loc, foulValue);
				tempR = foulValue;
			} else {
				document.getElementById("img" + loc + foulValue).style.visibility = "visible";
				tempR = foulValue;
			}
		}
	}

	if (event.data.foul != null){
		if (event.data.foul == "reset"){
			showAll("L");
			showAll("R");
			tempL = 5;
			tempR = 5;
		}
	}
	
	if (event.data.name != null) {	
		console.log("event.data.player: " + event.data.player + " event.data.name: " + event.data.name);
		if (!event.data.name == "") {
			document.getElementById("player" + event.data.player + "Name").innerHTML = event.data.name;
		} else {
			document.getElementById("player" + event.data.player + "Name").innerHTML = "Player " + event.data.player;
		}
	}

	if (event.data.quarter != null) {
		if (event.data.quarter == 1){
			document.getElementById("quarterValue").innerHTML = "1";
			document.getElementById("super").innerHTML = "st";
		}
		if (event.data.quarter == 2){
			document.getElementById("quarterValue").innerHTML = "2";
			document.getElementById("super").innerHTML = "nd";
		}
		if (event.data.quarter == 3){
			document.getElementById("quarterValue").innerHTML = "3";
			document.getElementById("super").innerHTML = "rd";
		}
		if (event.data.quarter == 4){
			document.getElementById("quarterValue").innerHTML = "4";
			document.getElementById("super").innerHTML = "th";
		}
		if (event.data.quarter == 5){
			document.getElementById("quarterValue").innerHTML = "OT";
			document.getElementById("super").innerHTML = "";
		}
	}
	//ganda ni claire
	if (event.data.team1 != null){
		console.log(event.data.team1);
		const imageElement1 = document.getElementById("leftTeam");
		imageElement1.src = "./images/" + event.data.team1 + "-L.PNG";
		const imageElement = document.getElementById("uc");
		imageElement.src = "./images/" + event.data.team1 + ".jpg";
	}

	if (event.data.team2 != null){
		console.log(event.data.team2);
		const imageElement2 = document.getElementById("rightTeam");
		imageElement2.src = "./images/" + event.data.team2 + "-R.PNG";
		const imageElement = document.getElementById("lc");
		imageElement.src = "./images/" + event.data.team2 + ".jpg";
	}

	if (event.data.under != null){
		console.log(event.data.under);
		document.getElementById("underValue").innerHTML = event.data.under;
	}
}


function blinkImg(id, foulValue){
	const img = document.getElementById(id + (foulValue + 1));
	setTimeout(function(){
		img.classList.remove("blinking-animation");
		img.style.visibility = "hidden";
	}, 1000)
	img.classList.add("blinking-animation");
}

function showAll(loc){
	document.getElementById("img" + loc + "1").style.visibility = "visible";
	document.getElementById("img" + loc + "2").style.visibility = "visible";
	document.getElementById("img" + loc + "3").style.visibility = "visible";
	document.getElementById("img" + loc + "4").style.visibility = "visible";
	document.getElementById("img" + loc + "5").style.visibility = "visible";
}

