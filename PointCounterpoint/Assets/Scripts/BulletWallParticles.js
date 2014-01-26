#pragma strict
var startTime : float;
function Start () {
	startTime = Time.time;
}

function Update () {
	if (!this.GetComponent(ParticleSystem).IsAlive()) {
		Destroy(gameObject);
	}
	if (Time.time - 3 > startTime) {
		Destroy(gameObject);
	}
}