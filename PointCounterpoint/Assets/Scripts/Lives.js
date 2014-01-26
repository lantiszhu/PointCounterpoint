#pragma strict

function Start () {
	var dist = (transform.position - Camera.main.transform.position).z;
	var leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x;
	var rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x;
	var topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y;
	var bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y;
	
	if (gameObject.name == "FireLife1") {
		transform.position.x = leftClamp + 10;
	}
	if (gameObject.name == "FireLife2") {
		transform.position.x = leftClamp + 6;
	}
	if (gameObject.name == "FireLife3") {
		transform.position.x = leftClamp + 2;
	}
	if (gameObject.name == "IceLife1") {
		transform.position.x = rightClamp - 10;
	}
	if (gameObject.name == "IceLife2") {
		transform.position.x = rightClamp - 6;
	}
	if (gameObject.name == "IceLife3") {
		transform.position.x = rightClamp - 2;
	}
	transform.position.y = topClamp - 2;
}

function Update () {

}