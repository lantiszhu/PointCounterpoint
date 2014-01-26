#pragma strict

public var speed = 30;
public var dist;
public var leftClamp : float;
public var rightClamp : float;
public var topClamp : float;
public var bottomClamp : float;
public var clampOffset : float = 0.5;

public var type;

function Start () {
	dist = (transform.position - Camera.main.transform.position).z;
	leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x;
	rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x;
	topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y;
	bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y;
}

function Update () {
	

	// clamp position to the edges of the screen
	transform.position.x = Mathf.Clamp(transform.position.x, leftClamp  + clampOffset, rightClamp - clampOffset);
	transform.position.y = Mathf.Clamp(transform.position.y, bottomClamp + clampOffset, topClamp - clampOffset);
}