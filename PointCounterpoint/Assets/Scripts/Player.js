#pragma strict

public var playerSpeed = 10;

function Start () {
	
}

function FixedUpdate () {
	// move left
	if (Input.GetKey(KeyCode.A)) {
		rigidbody2D.transform.position -= Vector2.right * playerSpeed * Time.deltaTime;
	}
	
	// move right
	else if (Input.GetKey(KeyCode.D)) {
		rigidbody2D.transform.position += Vector2.right * playerSpeed * Time.deltaTime;
	}
	
	// move up
	if (Input.GetKey(KeyCode.W)) {
		rigidbody2D.transform.position += Vector2.up * playerSpeed * Time.deltaTime;
	}
	
	// move down
	else if (Input.GetKey(KeyCode.S)) {
		rigidbody2D.transform.position -= Vector2.up * playerSpeed * Time.deltaTime;
	}
}