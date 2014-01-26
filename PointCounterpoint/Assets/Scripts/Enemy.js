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

public var redColor : Color32;
public var blueColor : Color32;

public var explosion : GameObject;

function Start () {
	dist = (transform.position - Camera.main.transform.position).z;
	leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x;
	rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x;
	topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y;
	bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y;
	
	// pick one or two to represent enemy type
	type = Random.Range(1, 3);
	
	if (type == 1) {
		// get player 2 to target
		target = GameObject.Find("Blue Player");
		// be red
		GetComponent(SpriteRenderer).color = redColor;
	} else {
		// get player 1 to target
		target = GameObject.Find("Red Player");
		// be blue
		GetComponent(SpriteRenderer).color = blueColor;
	}
}

function Update () {
	// go after target
	transform.position = Vector3.MoveTowards(transform.position, target.transform.position, speed);

	// clamp position to the edges of the screen
	transform.position.x = Mathf.Clamp(transform.position.x, leftClamp  + clampOffset, rightClamp - clampOffset);
	transform.position.y = Mathf.Clamp(transform.position.y, bottomClamp + clampOffset, topClamp - clampOffset);
	
	// spin slowly over time
	transform.Rotate(Vector3.forward, 1);
}

/**
* Handle collisions
* */
function OnCollisionEnter2D(col : Collision2D) {
	var playerScript : Player;

	// handle bullet collisions
	if (col.gameObject.tag == "Bullet") {
		if ((col.gameObject.name == "FireBullet(Clone)" && type == 2) 
			|| (col.gameObject.name == "IceBullet(Clone)" && type == 1)) {
			
			playerScript = col.gameObject.GetComponent(Bullet).playerScript;
			
			// give the player points
			playerScript.points += 1;
			
			// destroy the bullet
			GameObject.Destroy(col.gameObject);
			
			// Instantiate an explosion
			Instantiate(explosion, transform.position, Quaternion.identity);
			
			// destroy this enemy
			GameObject.Destroy(gameObject);
		}
	}
	// handle player collisions
	else if (col.gameObject.tag == "Player") {
		if ((col.gameObject.name == "Red Player" && type == 2)
			|| (col.gameObject.name == "Blue Player" && type == 1)) {
			
			playerScript = col.gameObject.GetComponent(Player);
			
			// hurt the player
			playerScript.health -= 1;
			
			// Instantiate an explosion
			Instantiate(explosion, transform.position, Quaternion.identity);
			
			// destroy this enemy
			GameObject.Destroy(gameObject);
		}
	}
}
