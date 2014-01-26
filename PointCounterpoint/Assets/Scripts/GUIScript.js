#pragma strict

// This script will only work with the Necromancer skin
var mySkin : GUISkin;

var p1Script : Player;
var p2Script : Player;

function Start () {
	p1Script = GameObject.Find("Red Player").GetComponent(Player);
	p2Script = GameObject.Find("Blue Player").GetComponent(Player);
}

function Update () {

}

function OnGUI () {
	// set skin to custom skin
	GUI.skin = mySkin;
	
	GUI.contentColor = Color.white;
	
	GUILayout.BeginArea(Rect((Screen.width / 2) - 50, 10, 100, 100));
	GUILayout.TextField((p1Script.points + p2Script.points).ToString());
	//GUILayout.Label((p1Script.points + p2Script.points).ToString());
	GUILayout.EndArea();
	
	//GUILayout.Label(p2Script.points.ToString());
	
	//GUILayout.Label(p1Script.health.ToString());
	//GUILayout.Label(p2Script.health.ToString());
}
