#pragma strict

// player's health
public var health : int = 3;
// player's points
public var points : float = 0;
// player's movement speed
public var playerSpeed = 30;

public var deadSprite : Sprite;

public var enemyScript : EnemyGenerator;

var dead = false;

// screen clamping variables
public var dist;
public var leftClamp : float;
public var rightClamp : float;
public var topClamp : float;
public var bottomClamp : float;
public var clampOffset : float;

// bullet to spawn when we shoot
public var bulletPrefab : GameObject;
// player number
public var playerNum = 1;
// gamepad value
public var gamepad = Pad.XB;
public var keyboardPlayer = 1;
var shotTimer : float;
public var shotCooldown : float = 1;
var playerAudio : AudioSource;

public var liveObjects = new GameObject[3];

function Start () {
	dist = (transform.position - Camera.main.transform.position).z;
	leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x;
	rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x;
	topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y;
	bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y;
	shotTimer = Time.time;
	playerAudio = GetComponent(AudioSource);
}

function FixedUpdate () {
	/***
	 * Get the left stick
	 * */
	var leftStick : Vector2 = GamePad.GetLeftStick(gamepad, playerNum);
	var rightStick : Vector2 = GamePad.GetRightStick(gamepad, playerNum);

	// move based on left stick
	MovePlayer(leftStick);
	
	// rotate the player with left stick
	if (leftStick.y != 0 || leftStick.x != 0) {
		var rotAng : float = (Mathf.Atan2(leftStick.y, leftStick.x) * Mathf.Rad2Deg) - 90;
		rigidbody2D.transform.rotation = Quaternion.AngleAxis(rotAng, Vector3.forward);
	}
	
	/**
	* Arrow key movement below
	* */

	var moveVector : Vector2 = Vector2.zero;
	var keyboardMove = false;
	// move left and right with keyboard
	if (Input.GetKey(KeyCode.A) && playerNum == keyboardPlayer) {
		moveVector -= Vector2.right;
		keyboardMove = true;
	} else if (Input.GetKey(KeyCode.D) && playerNum == keyboardPlayer) {
		moveVector += Vector2.right;
		keyboardMove = true;
	}
	
	// move up and down with keyboard
	if (Input.GetKey(KeyCode.W) && playerNum == keyboardPlayer) {
		moveVector += Vector2.up;
		keyboardMove = true;
	} else if (Input.GetKey(KeyCode.S) && playerNum == keyboardPlayer) {
		moveVector -= Vector2.up;
		keyboardMove = true;
	}
	
	if (keyboardMove) {
		MovePlayer(moveVector);
		
		// rotate based on movement
		var rotA : float = (Mathf.Atan2(moveVector.y, moveVector.x) * Mathf.Rad2Deg) - 90;
		rigidbody2D.transform.rotation = Quaternion.AngleAxis(rotA, Vector3.forward);
	}
	
	/*
	* Shooting below
	* */
	
	// Shooting with right stick
	if (rightStick.magnitude != 0) {
		ShootBullet(rightStick);
	}
	
	// Shooting with keyboard
	var shootVector : Vector2 = Vector2.zero;
	var keyboardShoot = false;
	
	if (Input.GetKey(KeyCode.LeftArrow) && playerNum == keyboardPlayer) {
		shootVector += -Vector2.right;
		keyboardShoot = true;
	} else if (Input.GetKey(KeyCode.RightArrow) && playerNum == keyboardPlayer) {
		shootVector += Vector2.right;
		keyboardShoot = true;
	}
	
	if (Input.GetKey(KeyCode.UpArrow) && playerNum == keyboardPlayer) {
		shootVector += Vector2.up;
		keyboardShoot = true;
	} else if (Input.GetKey(KeyCode.DownArrow) && playerNum == keyboardPlayer) {
		shootVector += -Vector2.up;
		keyboardShoot = true;
	}
	
	if (keyboardShoot) {
		ShootBullet(shootVector);
	}
	
	// clamp position to the edges of the screen
	transform.position.x = Mathf.Clamp(transform.position.x, leftClamp  + clampOffset, rightClamp - clampOffset);
	transform.position.y = Mathf.Clamp(transform.position.y, bottomClamp + clampOffset, topClamp - clampOffset);
}

/**
* Move the player
* */
function MovePlayer(dir : Vector2) {
	if (dead)
		return;
	rigidbody2D.transform.position += dir * playerSpeed * Time.deltaTime;
}

/**
* Shoot a bullet
* */
function ShootBullet(dir : Vector2) {
	// instantiate a bullet
	if (Time.time - shotTimer >= shotCooldown) {
		var b : GameObject = Instantiate(bulletPrefab, transform.position, Quaternion.identity);
		
		// get the Bullet script from the instantiated bullet
		var bulletScript : Bullet = b.GetComponent("Bullet");
		
		// set the playerScript to this playerScript
		bulletScript.playerScript = this;
		//Debug.Log(dir);
		// set the direction the bullet should travel
		bulletScript.dir = dir;
		
		playerAudio.Play();
		
		shotTimer = Time.time;
	}
}

function hurtPlayer() {
	health -= 1;
	
	for (var i = 0; i < liveObjects.length; i++) {//life : GameObject in liveObjects) {
		var life : GameObject = liveObjects[i];
		if (life != null) {
			Destroy(life);
			if (i == liveObjects.length - 1) {
				dead = true;
				gameObject.GetComponent(SpriteRenderer).sprite = deadSprite;
				gameObject.transform.localScale = Vector3(0.75, 0.75, gameObject.transform.localScale.z);
			}
			return;
		}
	}
	
	dead = true;
	gameObject.GetComponent(SpriteRenderer).sprite = deadSprite;
	gameObject.transform.localScale = Vector3(0.75, 0.75, gameObject.transform.localScale.z);
}

function Score() {
	if (dead)
		return;
	Debug.Log("Points: " + enemyScript.enemyPoints);
	points += Mathf.FloorToInt(enemyScript.enemyPoints);
}
