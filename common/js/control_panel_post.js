'use strict';

//  Scoreboard modified by Mark Joseph Orino
//  Based on G4ScoreBoard addon for OBS version 1.6.0 Copyright 2022 Norman Gholson IV

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// variable declarations
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bc = new BroadcastChannel('mj-main');
const bcr = new BroadcastChannel('mj-recv'); // return channel from browser_source 
var hotkeyP1ScoreUp;
var hotkeyP1ScoreDown;
var hotkeyP2ScoreUp;
var hotkeyP2ScoreDown;
var hotkeyScoreReset;
var hotkeyQtrAdd;
var hotkeyQtrSub;
var hotkeyP1FoulAdd;
var hotkeyP1FoulSub;
var hotkeyP2FoulAdd;
var hotkeyP2FoulSub;
var hotkeyP1ScoreUpOld = hotkeyP1ScoreUp;
var hotkeyP2ScoreUpOld = hotkeyP2ScoreUp;
var hotkeyP1ScoreDownOld = hotkeyP1ScoreDown;
var hotkeyP2ScoreDownOld = hotkeyP2ScoreDown;
var hotkeyScoreResetOld = hotkeyScoreReset;
var hotkeyQtrAddOld = hotkeyQtrAdd;
var hotkeyQtrSubOld = hotkeyQtrSub;
var hotkeyP1FoulAddOld = hotkeyP1FoulAdd;
var hotkeyP1FoulSubOld = hotkeyP1FoulSub;
var hotkeyP2FoulAddOld = hotkeyP2FoulAdd;
var hotkeyP2FoulSubOld = hotkeyP2FoulSub;
var p1ScoreValue = 0;
var p2ScoreValue = 0;
var qtrValue = 1;
var foulValueL = 5;
var foulValueR = 5;
var msg;
var msg2;
var msg3;
var ani;
var p1namemsg;
var p2namemsg;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// onload stuff
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("verNum").innerHTML = versionNum;
// postNames();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// broadcast channel events from browser_source
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			

bcr.onmessage = (event) => {
	
}
