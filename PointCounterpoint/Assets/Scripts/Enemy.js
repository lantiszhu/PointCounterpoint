#pragma strict

public var speed : float = 0.2;
public var dist;
public var leftClamp : float;
public var rightClamp : float;
public var topClamp : float;
public var bottomClamp : float;
public var clampOffset : float = 0.5;

public var type;
public var target : GameObject;

function Start () {
	dist = (transform.position - Camera.main.transform.position).z;
	leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x;
	rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x;
	topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y;
	bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y;
}

function Update () {
	if (type == 1) {
		// get player 2 to target
		target = GameObject.Find("Blue Player");
		// be red
	} else {
		// get player 1 to target
		target = GameObject.Find("Red Player");
		// be blue
	}
	
	// go after target
	transform.position = Vector3.MoveTowards(transform.position, target.transform.position, speed);

	// clamp position to the edges of the screen
	transform.position.x = Mathf.Clamp(transform.position.x, leftClamp  + clampOffset, rightClamp - clampOffset);
	transform.position.y = Mathf.Clamp(transform.position.y, bottomClamp + clampOffset, topClamp - clampOffset);
}

function OnCollisionEnter2D(col : Collision2D) {
	Debug.Log("collision");
	if (col.gameObject.tag == "Bullet") {
		GameObject.Destroy(col.gameObject);
		GameObject.Destroy(gameObject);
	}
}
