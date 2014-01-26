#pragma strict

public var speed = 50;
public var playerScript : Player;
public var dir : Vector2 = Vector2.zero;
public var clampOffset : float;
public var bulletWallParticles : GameObject;

function Start () {
	//playerScript = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
}

function Update () {
	dir.Normalize();
	transform.position += dir * speed * Time.deltaTime;
	
	if (transform.position.y > playerScript.topClamp - clampOffset || transform.position.y < playerScript.bottomClamp + clampOffset
	 || transform.position.x > playerScript.rightClamp - clampOffset || transform.position.x < playerScript.leftClamp + clampOffset) {
		//Debug.Log(transform.position.y);
		//Debug.Log(playerScript.topClamp);
		var particles : GameObject = Instantiate(bulletWallParticles, transform.position, Quaternion.identity);
		setParticlesRotation(particles);
		Destroy(gameObject);
	}
}

function setParticlesRotation(particles : GameObject) {
	if (transform.position.y > playerScript.topClamp - clampOffset) {
		particles.transform.rotation = Quaternion.Euler(90, 0, 0);
	}
	else if (transform.position.y < playerScript.bottomClamp + clampOffset) {
		particles.transform.rotation = Quaternion.Euler(-90, 0, 0);
	}
	else if (transform.position.x > playerScript.rightClamp - clampOffset) {
		particles.transform.rotation = Quaternion.Euler(0, -90, 90);
	}
	else {
		particles.transform.rotation = Quaternion.Euler(0, -270, 270);
	}
}