#pragma strict

var foobar = "REPLACE ME WITH A VARIABLE"
public var leftClamp = foobar;
public var rightClamp = foobar;

function Start () {

}

function Update () {
	
	if (rigidbody2D.transform.position < leftClamp || rigidbody2D.transform.position > rightClamp) {
		Debug.Log("Clamped.")
		
		Vector3 pos = rigidbody2D.transform.position;
		
		pos.x = Math.Clamp(pos.x, leftClamp, rightClamp);
		
		rigidbody2D.transform.position = pos;
	}

}