'use strict';
var addend1 = 0;
var addend2 = 0;
var team1 = "";
var team2 = "";
let scheduleArray;
let gameCount = 0;
let finalScoreText = "";
let p1Scores = 0;
let p2Scores = 0;

let prevScore1 = 0;
let prevScore2 = 0;

let tempScore1 = 0;
let tempScore2 = 0;

let p1TeamName = "";
let p2TeamName = "";
let underCategory = "";

let p1Finals = "";
let p2Finals = "";
//  Scoreboard modified by Mark Joseph Orino
//  Based on G4ScoreBoard addon for OBS version 1.6.0 Copyright 2022 Norman Gholson IV
function teamName() {
	var teamValue1 = document.getElementById("p1TeamDiv").value;
	var teamValue2 = document.getElementById("p2TeamDiv").value;
	if (!teamValue1 == "") { 
		team1 = teamValue1;
		document.getElementById("sendP1Score").innerHTML = teamValue1 + "<br>+1 Score"; 
		document.getElementById("sendP1ScoreSub").innerHTML = teamValue1 + "<br>-1 Score"; 
		document.getElementById("sendP1FoulAdd").innerHTML = teamValue1 + "<br>+1 Foul"; 
		document.getElementById("sendP1FoulSub").innerHTML = teamValue1 + "<br>-1 Foul"; 
	} else { 
		document.getElementById("sendP1Score").innerHTML = "P1 +1 Score"; 
		document.getElementById("sendP1ScoreSub").innerHTML = "P1 -1 Score"; 
		document.getElementById("sendP1FoulAdd").innerHTML = "P1 +1 Foul"; 
		document.getElementById("sendP1FoulSub").innerHTML = "P1 -1 Foul"; 
	}
	if (!teamValue2 == "") { 
		team2 = teamValue2;
		document.getElementById("sendP2Score").innerHTML = teamValue2 + "<br>+1 Score"; 
		document.getElementById("sendP2ScoreSub").innerHTML = teamValue2 + "<br>-1 Score"; 
		document.getElementById("sendP2FoulAdd").innerHTML = teamValue2 + "<br>+1 Foul"; 
		document.getElementById("sendP2FoulSub").innerHTML = teamValue2 + "<br>-1 Foul"; 
	} else { 
		document.getElementById("sendP2Score").innerHTML = "P2 +1 Score"; 
		document.getElementById("sendP2ScoreSub").innerHTML = "P2 -1 Score"; 
		document.getElementById("sendP2FoulAdd").innerHTML = "P2 +1 Foul"; 
		document.getElementById("sendP2FoulSub").innerHTML = "P2 -1 Foul"; 
	}
	bc.postMessage({ team1: teamValue1, team2: teamValue2});

	var underValue = document.getElementById("underDiv").value;
	bc.postMessage({ under: underValue});

	const p1Team = document.getElementById('p1TeamDiv');
	const p2Team = document.getElementById('p2TeamDiv');
	p1TeamName = p1Team.options[p1Team.selectedIndex].text; // Get the text
	p2TeamName = p2Team.options[p2Team.selectedIndex].text; // Get the text
	underCategory = document.getElementById('underDiv').options[document.getElementById('underDiv').selectedIndex].text;

	const copyText = `Season 7 – Regular Season, ${underCategory}: ${p2TeamName} vs ${p1TeamName}`;
	document.getElementById('copyBtn').innerText = copyText;

	console.log(p1Finals);
	console.log(p2Finals);
	// finalScoreText = p1TeamName + " | " + p2TeamName + " | " + underCategory + " | ";
	// document.getElementById('finalScoreBtn').innerText = finalScoreText;
}

function clearTeams() {
	document.getElementById('copyBtn').innerText = "Season 6";
	document.getElementById("p1TeamDiv").value = "";
	document.getElementById("sendP1Score").innerHTML = "P1 +1 Score"; 
	document.getElementById("sendP1ScoreSub").innerHTML = "P1 -1 Score"; 
	document.getElementById("p2TeamDiv").value = "";	
	document.getElementById("sendP2Score").innerHTML = "P2 +1 Score"; 
	document.getElementById("sendP2ScoreSub").innerHTML = "P2 -1 Score"; 
	document.getElementById("sendP2FoulAdd").innerHTML = "P2 +1 Foul"; 
	document.getElementById("sendP2FoulSub").innerHTML = "P2 -1 Foul"; 
	document.getElementById("sendP1FoulAdd").innerHTML = "P1 +1 Foul"; 
	document.getElementById("sendP1FoulSub").innerHTML = "P1 -1 Foul"; 
	document.getElementById("underDiv").value = "";
	bc.postMessage({ team1: "", team2: ""});
	bc.postMessage({ under: ""});
}

function swapTeams(){
	let teamValue1 = document.getElementById("p1TeamDiv");
	let teamValue2 = document.getElementById("p2TeamDiv");

	let temp = teamValue1.value;
	teamValue1.value = teamValue2.value;
	teamValue2.value = temp;
	teamName();
}

function postScore(opt1, player) {
	var timer;
	if (player == "1") {
		if (opt1 == "add") {
			// Increment click count
			addend1++;	
			// Clear previous timer (if any)
			clearTimeout(timer);

			// Animate
			ani = {animate: 1, player: player, opt: opt1, addend: addend1};
			bc.postMessage(ani);
			// Set a new timer to reset click count after 1 second
			timer = setTimeout(function() {
				p1ScoreValue += addend1;
				msg = { player: player, score: p1ScoreValue};
				bc.postMessage(msg);

				// Reset click count after 1 second
				console.log("addend to pass: " + addend1);
				addend1 = 0;
			}, 1200);
			document.getElementById("sendP" + player + "Score").style.border = "1px solid lightgreen";
			setTimeout(rst_scr_btn, 100);
		} else {
			if (p1ScoreValue > 0) {
				// Increment click count
				addend1++;	
				// Clear previous timer (if any)
				clearTimeout(timer);

				// Animate
				ani = {animate: 1, player: player, opt: opt1, addend: addend1};
				bc.postMessage(ani);
				// Set a new timer to reset click count after 1 second
				timer = setTimeout(function() {
					p1ScoreValue -= addend1;
					msg = { player: player, score: p1ScoreValue};
					bc.postMessage(msg);

					// Reset click count after 1 second
					console.log("addend to pass: " + addend1);
					addend1 = 0;
					
				}, 1200);
				document.getElementById("sendP" + player + "ScoreSub").style.border = "1px solid tomato";
				setTimeout(rst_scr_btn, 100);
			}
		}
	}
	if (player == "2") {
		if (opt1 == "add") {
			// Increment click count
			addend2++;
			// Clear previous timer (if any)
			clearTimeout(timer);

			// Animate
			ani = {animate: 1, player: player, opt: opt1, addend: addend2};
			bc.postMessage(ani);
			// Set a new timer to reset click count after 1 second
			timer = setTimeout(function() {
				p2ScoreValue += addend2;
				msg = { player: player, score: p2ScoreValue};
				bc.postMessage(msg);

				// Reset click count after 1 second
				console.log("addend to pass: " + addend2);
				addend2 = 0;
			}, 1200);
			document.getElementById("sendP" + player + "Score").style.border = "1px solid lightgreen";
			setTimeout(rst_scr_btn, 100);
		} else {
			if (p2ScoreValue > 0) {
			// Increment click count
			addend2++;	

			// Clear previous timer (if any)
			clearTimeout(timer);

			// Animate
			ani = {animate: 1, player: player, opt: opt1, addend: addend2};
			bc.postMessage(ani);
			// Set a new timer to reset click count after 1 second
			timer = setTimeout(function() {
				p2ScoreValue -= addend2;
				msg = { player: player, score: p2ScoreValue};
				bc.postMessage(msg);

				// Reset click count after 1 second
				console.log("addend to pass: " + addend2);
				addend2 = 0;
				
			}, 1200);
			document.getElementById("sendP" + player + "ScoreSub").style.border = "1px solid tomato";
			setTimeout(rst_scr_btn, 100);
			}
		}
	}
}

function postFoul(opt, player){
	if (player == "1") {
		if (opt == "add") {
			if (foulValueL < 5){
				foulValueL += 1;
				msg2 = { player: player, foulValue: foulValueL};
				bc.postMessage(msg2);
				document.getElementById("sendP" + player + "FoulAdd").style.border = "1px solid lightgreen";
				setTimeout(rst_scr_btn, 100);
			}
			
		} else {
			if (foulValueL > 0){
				foulValueL -= 1;
				msg2 = { player: player, foulValue: foulValueL};
				bc.postMessage(msg2);
				document.getElementById("sendP" + player + "FoulSub").style.border = "1px solid tomato";
				setTimeout(rst_scr_btn, 100);
			}
		}
	}
	if (player == "2") {
		if (opt == "add") {
			if (foulValueR < 5){
				foulValueR += 1;
				msg2 = { player: player, foulValue: foulValueR};
				bc.postMessage(msg2);
				document.getElementById("sendP" + player + "FoulAdd").style.border = "1px solid lightgreen";
				setTimeout(rst_scr_btn, 100);
			}
		} else {
			if (foulValueR > 0){
				foulValueR -= 1;
				msg2 = { player: player, foulValue: foulValueR};
				bc.postMessage(msg2);
				document.getElementById("sendP" + player + "FoulSub").style.border = "1px solid tomato";
				setTimeout(rst_scr_btn, 100);
			}
		}
	}
}

function postQtr(opt){
	if (opt == "add"){
		if (qtrValue != 5){
			qtrValue += 1;
			msg3 = { quarter: qtrValue };
			document.getElementById("qtr").innerHTML = "Quarter " + qtrValue; 
			bc.postMessage(msg3);
			document.getElementById("qtrAdd").style.border = "1px solid lightgreen";
			setTimeout(rst_scr_btn, 100);
		}
	} else {
		if (qtrValue > 1){
			qtrValue -= 1;
			msg3 = { quarter: qtrValue };
			document.getElementById("qtr").innerHTML = "Quarter " + qtrValue; 
			bc.postMessage(msg3);
			document.getElementById("qtrSub").style.border = "1px solid tomato";
			setTimeout(rst_scr_btn, 100);
		}
	}

	tempScore1 = p1ScoreValue - prevScore1;
	p1Finals += tempScore1 + " | ";
	console.log(p1Finals);

	tempScore2 = p2ScoreValue - prevScore2;
	p2Finals += tempScore2 + " | ";
	console.log(p2Finals);


	prevScore1 = p1ScoreValue;
	prevScore2 = p2ScoreValue;

	finalScoreText = underCategory + " | " + p1TeamName + " | " + p1Finals + p2TeamName + " | " + p2Finals;
	document.getElementById('finalScoreBtn').innerText = finalScoreText;
}

function rst_scr_btn() {
	document.getElementById("sendP1Score").style.border = "none";
	document.getElementById("sendP2Score").style.border = "none";
	document.getElementById("sendP1ScoreSub").style.border = "none";
	document.getElementById("sendP2ScoreSub").style.border = "none";
	document.getElementById("sendP1FoulAdd").style.border = "none";
	document.getElementById("sendP1FoulSub").style.border = "none";
	document.getElementById("sendP2FoulAdd").style.border = "none";
	document.getElementById("sendP2FoulSub").style.border = "none";
	document.getElementById("qtrAdd").style.border = "none";
	document.getElementById("qtrSub").style.border = "none";
	document.getElementById("copyBtn").style.border = "none";
}

function resetScore() {
	if (confirm("Click OK to confirm score reset")) {
		document.getElementById("qtr").innerHTML = "Quarter 1";
		document.getElementById('finalScoreBtn').innerText = "This is for final score layout.";
		prevScore1 = 0;
		prevScore2 = 0;
		tempScore1 = 0;
		tempScore2 = 0;
		p1ScoreValue = 0;
		p2ScoreValue = 0;
		qtrValue = 1;
		foulValueL = 5;
		foulValueR = 5;
		p1Finals = "";
		p2Finals = "";
		finalScoreText = "";
		bc.postMessage({ foul: "reset"});
		bc.postMessage({ player: '1', score: p1ScoreValue });
		bc.postMessage({ player: '2', score: p2ScoreValue });
		bc.postMessage({ quarter: qtrValue});
	} else { }
}

function copyText(element) {
	document.getElementById("copyBtn").style.border = "1px solid lightgreen";
	setTimeout(rst_scr_btn, 100);
    const originalText = element.textContent;
    const textToCopy = originalText.trim(); // Ensure no accidental spaces

    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Modern method (Clipboard API)
        navigator.clipboard.writeText(textToCopy).then(() => {
            showCopiedMessage(element, originalText);
        }).catch(err => {
            console.error("Failed to copy using Clipboard API: ", err);
            fallbackCopyText(textToCopy, element, originalText);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyText(textToCopy, element, originalText);
    }
}

function fallbackCopyText(text, element, originalText) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile support

    try {
        const successful = document.execCommand("copy");
        if (successful) {
            showCopiedMessage(element, originalText);
        } else {
            console.error("Failed to copy using execCommand");
        }
    } catch (err) {
        console.error("Fallback copy failed: ", err);
    }

    document.body.removeChild(textArea);
}

function showCopiedMessage(element, originalText) {
    element.textContent = "Text copied!";
    setTimeout(() => {
        element.textContent = originalText;
    }, 1000);
}

function getSchedule(){
	const input = document.getElementById('schedule').value;
	scheduleArray = input.split('\n').map(line => line.trim()).filter(line => line !== '');
	console.log(scheduleArray);
	gameCount = 0;
	currentGame();
}

function setTeamByText(num, text) {
    let select = document.getElementById(num + "Div");
	console.log(text);
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text === text) {
            select.selectedIndex = i;
            break;
        }
    }
}

function currentGame(){
	const gameInfo = splitStringToArray(scheduleArray[gameCount]);
	console.log(gameInfo);
	setTeamByText("under", gameInfo[0]);
	setTeamByText("p1Team", gameInfo[1]);
	setTeamByText("p2Team", gameInfo[2]);
	teamName();
}

function splitStringToArray(str) {
    return str.split(' | ').map(item => item.trim());
}

function nextGame(){
	if (gameCount != scheduleArray.length){
		gameCount++;
		currentGame();
	}
}

function prevGame(){
	if (gameCount != scheduleArray.length){
		gameCount--;
		currentGame();
	}
}
