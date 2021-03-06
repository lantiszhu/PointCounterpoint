﻿#pragma strict

public var enemy : GameObject;
public var lastSpawnTime : float;
public var spawnDelay : float;
public var spawnLocation : Vector2;

// for getting screen boundaries
public var dist;
public var leftClamp : float;
public var rightClamp : float;
public var topClamp : float;
public var bottomClamp : float;
public var clampOffset : float = 0.5;
public var enemySpeed = 0.2;
public var enemyPoints : float = 1;

public var spawnLocations = new Vector2[8];

function Start () {
	// get screen boundaries
	dist = (transform.position - Camera.main.transform.position).z;
	leftClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).x + clampOffset;
	rightClamp = Camera.main.ViewportToWorldPoint(Vector3(1, 0, dist)).x - clampOffset;
	topClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 1, dist)).y  - clampOffset;
	bottomClamp = Camera.main.ViewportToWorldPoint(Vector3(0, 0, dist)).y + clampOffset;
	
	// top left
	spawnLocations[0] = Vector2(leftClamp, topClamp);
	// top middle
	spawnLocations[1] = Vector2(0, topClamp);
	// top right
	spawnLocations[2] = Vector2(rightClamp, topClamp);
	// left middle
	spawnLocations[3] = Vector2(leftClamp, 0);
	// right middle
	spawnLocations[4] = Vector2(rightClamp, 0);
	// bottom left
	spawnLocations[5] = Vector2(leftClamp, bottomClamp);
	// bottom middle
	spawnLocations[6] = Vector2(0, bottomClamp);
	// bottom right
	spawnLocations[7] = Vector2(rightClamp, bottomClamp);
}

function Update () {
	enemySpeed += 0.00001;
	enemyPoints += 0.01;
	if (lastSpawnTime + spawnDelay < Time.time) {
		// choose a random spawn location
		var l = Random.Range(0, 8);
		//Debug.Log("spawn location: "+l);
		spawnLocation = spawnLocations[l];
		
		// instantiate an enemy
		var e = Instantiate(enemy, spawnLocation, Quaternion.identity);
		Debug.Log("Enemy speed: " + enemySpeed);
		e.GetComponent(Enemy).speed = enemySpeed;
		
		// store spawn time
		lastSpawnTime = Time.time;
	}
}