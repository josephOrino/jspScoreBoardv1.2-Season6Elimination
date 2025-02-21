'use strict';
//  Scoreboard modified by Mark Joseph Orino
//  Based on G4ScoreBoard addon for OBS version 1.6.0 Copyright 2022 Norman Gholson IV

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//										variable declarations
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			

const bcr = new BroadcastChannel('mj-recv'); // browser_source -> control_panel channel 
const bc = new BroadcastChannel('mj-main');
var playerNumber;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//										broadcast channel events
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			

bc.onmessage = (event) => {
	if (event.data.score != null) {
		console.log("event.data.player: " + event.data.player + "  event.data.score: " + event.data.score);
		if (event.data.score > document.getElementById("player" + event.data.player + "Score").innerHTML) {
			const subsOdometer = document.getElementById("player" + event.data.player + "Score");
			const backgroundVideoo = document.getElementById("background-video");
			const odometer = new Odometer({
			el: subsOdometer,
			})
			// odometer.update(10864);
			subsOdometer.innerHTML = event.data.score;
		} else {
			const subsOdometer = document.getElementById("player" + event.data.player + "Score");

			const odometer = new Odometer({
			el: subsOdometer,
			})

			// odometer.update(10864);
			subsOdometer.innerHTML = event.data.score;
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
		if (event.data.quarter == 5) {
			document.getElementById("quarterValue").innerHTML = 1;
			document.getElementById("quarterWordValue").innerHTML = "OT";
		}else {
			document.getElementById("quarterValue").innerHTML = event.data.quarter;
			document.getElementById("quarterWordValue").innerHTML = "QTR";
		}
		
	}

	if (event.data.team1 != null){
		const imageElement1 = document.getElementById("leftTeamWS");
		imageElement1.src = "./images/" + event.data.team1 + "-WSL.PNG";
	}

	if (event.data.team2 != null){
		const imageElement2 = document.getElementById("rightTeamWS");
		imageElement2.src = "./images/" + event.data.team2 + "-WSR.PNG";
	}

	if (event.data.under != null){
		console.log(event.data.under);
		document.getElementById("underValue").innerHTML = event.data.under;
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
//							autostart stuff
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



