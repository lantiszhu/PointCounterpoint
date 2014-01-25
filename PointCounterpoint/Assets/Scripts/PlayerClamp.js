#pragma strict

public var dist;
public var leftClamp;
public var rightClamp;
public var topClamp;
public var bottomClamp;

function Start () {
	dist = (transform.position - Camera.main.transform.position).z;
	leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x;
	rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x;
	topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y;
	bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y;
}

function Update () {
	
	transform.position.x = Mathf.Clamp(transform.position.x, leftClamp, rightClamp);
	transform.position.y = Mathf.Clamp(transform.position.y, topClamp, bottomClamp);

}