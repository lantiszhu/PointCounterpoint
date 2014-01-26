#pragma strict

var mySkin : GUISkin;

var introImage : Texture;

function Start () {

}

function Update () {
	if (Input.GetKey(KeyCode.Space) || GamePad.StartButton(Pad.XB, 1) || GamePad.StartButton(Pad.XB, 2)) {
		Application.LoadLevel(Application.loadedLevel + 1);
	}
}

function OnGUI() {
	GUI.skin = mySkin;
	
	GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), introImage);
	
	GUI.Label(new Rect(Screen.width / 2 - 150, Screen.height - 50, 300, 100), "Press Start");
}
