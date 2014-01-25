#pragma strict

public var speed = 30;
public var playerScript : Player;

function Start () {
	playerScript = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
}

function Update () {
	transform.position += Vector2.up * speed * Time.deltaTime;
	
	if (transform.position.y > playerScript.topClamp) {
		//Debug.Log(transform.position.y);
		//Debug.Log(playerScript.topClamp);
		Destroy(gameObject);
	}
}