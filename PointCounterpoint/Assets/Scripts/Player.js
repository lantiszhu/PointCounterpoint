#pragma strict

public var playerSpeed = 30;
public var dist;
public var leftClamp : float;
public var rightClamp : float;
public var topClamp : float;
public var bottomClamp : float;
public var bulletPrefab : GameObject; //bullet to spawn when we shoot
public var playerNum = 1; //player number
public var gamepad = Pad.XB; //gamepad value
public var keyboardPlayer = 1;
var shotTimer : float;
public var shotCooldown : float = 1;
var playerAudio : AudioSource;
public var shotClip : AudioClip;

function Start () {
	dist = (transform.position - Camera.main.transform.position).z;
	leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x + .5;
	rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x - .5;
	topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y  - .5;
	bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y + .5;
	shotTimer = Time.time;
	playerAudio = GetComponent(AudioSource);
	playerAudio.clip = shotClip;
}

function FixedUpdate () {
	/***
	 * Get the left stick
	 * */
	var leftStick : Vector2 = GamePad.GetLeftStick(gamepad, playerNum);
	var rightStick : Vector2 = GamePad.GetRightStick(gamepad, playerNum);

	// move based on left stick
	rigidbody2D.transform.position += leftStick * playerSpeed * Time.deltaTime;
	
	// rotate the player with left stick
	if (leftStick.y != 0 || leftStick.x != 0) {
		var rotAng : float = (Mathf.Atan2(leftStick.y, leftStick.x) * Mathf.Rad2Deg) - 90;
		rigidbody2D.transform.rotation = Quaternion.AngleAxis(rotAng, Vector3.forward);
	}
	
	/**
	* Arrow key movement below
	* */

	// move left and right with keyboard
	if (Input.GetKey(KeyCode.A) && playerNum == keyboardPlayer) {
		rigidbody2D.transform.position -= Vector2.right * playerSpeed * Time.deltaTime;
	} else if (Input.GetKey(KeyCode.D) && playerNum == keyboardPlayer) {
		rigidbody2D.transform.position += Vector2.right * playerSpeed * Time.deltaTime;
	}
	
	// move up and down with keyboard
	if (Input.GetKey(KeyCode.W) && playerNum == keyboardPlayer) {
		rigidbody2D.transform.position += Vector2.up * playerSpeed * Time.deltaTime;
	} else if (Input.GetKey(KeyCode.S) && playerNum == keyboardPlayer) {
		rigidbody2D.transform.position -= Vector2.up * playerSpeed * Time.deltaTime;
	}
	
	// Shooting with right stick
	if (rightStick.magnitude != 0) {
		ShootBullet(rightStick);
	}
	
	// Shooting with keyboard
	if (Input.GetKey(KeyCode.LeftArrow) && playerNum == keyboardPlayer) {
		ShootBullet(-Vector2.right);
	} else if (Input.GetKey(KeyCode.RightArrow) && playerNum == keyboardPlayer) {
		ShootBullet(Vector2.right);
	} else if (Input.GetKey(KeyCode.UpArrow) && playerNum == keyboardPlayer) {
		ShootBullet(Vector2.up);
	} else if (Input.GetKey(KeyCode.DownArrow) && playerNum == keyboardPlayer) {
		ShootBullet(-Vector2.up);
	}
	
	// clamp position to the edges of the screen
	transform.position.x = Mathf.Clamp(transform.position.x, leftClamp, rightClamp);
	transform.position.y = Mathf.Clamp(transform.position.y, bottomClamp, topClamp);
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
		Debug.Log(dir);
		// set the direction the bullet should travel
		bulletScript.dir = dir;
		
		playerAudio.Play();
		
		shotTimer = Time.time;
	}
}
