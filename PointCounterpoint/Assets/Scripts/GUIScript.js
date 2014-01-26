#pragma strict

// This script will only work with the Necromancer skin
var mySkin : GUISkin;

var p1Script : Player;
var p2Script : Player;

var gameOver = false;

function Start () {
	p1Script = GameObject.Find("Red Player").GetComponent(Player);
	p2Script = GameObject.Find("Blue Player").GetComponent(Player);
	
	Time.timeScale = 1;
}

function Update () {
	// both players are dead
	if (p1Script.dead && p2Script.dead) {
		// GAME OVER
		gameOver = true;
		Time.timeScale = 0;
	}
}

function OnGUI () {
	// set skin to custom skin
	GUI.skin = mySkin;
	
	GUI.contentColor = Color.white;
	
	GUILayout.BeginArea(Rect((Screen.width / 2) - 50, 10, 100, 100));
	GUILayout.TextField((p1Script.points + p2Script.points).ToString());
	GUILayout.EndArea();
	
	if (gameOver) {
		if (GUI.Button(new Rect(Screen.width / 2 - 150, Screen.height / 2 - 50, 300, 100), "Game Over")) {
			Application.LoadLevel(Application.loadedLevel);
		}
	}
}
