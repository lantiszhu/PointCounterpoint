#pragma strict

public var playerSpeed = 10;
public var dist;
public var leftClamp;
public var rightClamp;
public var topClamp : float;
public var bottomClamp;
public var bulletPrefab : GameObject;

function Start () {
	dist = (transform.position - Camera.main.transform.position).z;
	leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x;
	rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x;
	topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y;
	bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y;
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
	
	if (Input.GetKey(KeyCode.LeftArrow)) {
		Instantiate(bulletPrefab, transform.position, Quaternion.identity);
	}
	
	transform.position.x = Mathf.Clamp(transform.position.x, leftClamp, rightClamp);
	transform.position.y = Mathf.Clamp(transform.position.y, bottomClamp, topClamp);
}