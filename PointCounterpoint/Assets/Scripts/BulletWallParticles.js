#pragma strict

function Start () {

}

function Update () {
	if (!this.GetComponent(ParticleSystem).IsAlive()) {
		Destroy(gameObject);
	}
}