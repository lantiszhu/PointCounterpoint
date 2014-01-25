#pragma strict

public var speed = 30;
public var dist;
public var leftClamp : float;
public var rightClamp : float;
public var topClamp : float;
public var bottomClamp : float;

function Start () {
	dist = (transform.position - Camera.main.transform.position).z;
	leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x;
	rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x;
	topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y;
	bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y;
}

function Update () {

}