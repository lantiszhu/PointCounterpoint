#pragma strict

public var speed = 50;
public var playerScript : Player;
public var dir : Vector2 = Vector2.zero;

function Start () {
	//playerScript = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
}

function Update () {
	dir.Normalize();
	transform.position += dir * speed * Time.deltaTime;
	
	if (transform.position.y > playerScript.topClamp || transform.position.y < playerScript.bottomClamp
	 || transform.position.x > playerScript.rightClamp || transform.position.x < playerScript.leftClamp) {
		//Debug.Log(transform.position.y);
		//Debug.Log(playerScript.topClamp);
		Destroy(gameObject);
	}
}