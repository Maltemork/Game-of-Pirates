"use strict";
window.addEventListener("load", start);

// ======= Variables ======= //
let points = 0;
let lives = 3;

// ======= Start ======= //
function start() {
  console.log("JavaScript kører!");
  startAnimations();
  startClicks();
  startPositions();
  animationEnd();
  startSounds();
}

function startPositions() {
  document.querySelector("#treasure1_container").classList.add("position1");
  document.querySelector("#treasure2_container").classList.add("position2");
  document.querySelector("#treasure3_container").classList.add("position3");
  document.querySelector("#skull_container").classList.add("position4");
  document.querySelector("#rum_container").classList.add("position5");
  document.querySelector("#rum_container").addEventListener("animationend", rumRestart);
}

function startClicks() {
  document
    .querySelector("#treasure1_container")
    .addEventListener("mousedown", clickTreasure);
  document
    .querySelector("#treasure2_container")
    .addEventListener("mousedown", clickTreasure);
  document
    .querySelector("#treasure3_container")
    .addEventListener("mousedown", clickTreasure);
  document
    .querySelector("#skull_container")
    .addEventListener("mousedown", clickSkull);
  document.querySelector("#rum_container").addEventListener("click", rumRestart);
}

function startAnimations() {
  document.querySelector("#treasure1_container").classList.add("jumping3");
  document.querySelector("#treasure2_container").classList.add("jumping3");
  document.querySelector("#treasure3_container").classList.add("jumping3");
  document.querySelector("#skull_container").classList.add("jumping2");
  document.querySelector("#rum_container").classList.add("jumping_rum");
}

function animationEnd() {
  document
    .querySelector("#treasure1_container")
    .addEventListener("animationend", treasureRestart);
  document
    .querySelector("#treasure2_container")
    .addEventListener("animationend", treasureRestart);
  document
    .querySelector("#treasure3_container")
    .addEventListener("animationend", treasureRestart);
  document
    .querySelector("#skull_container")
    .addEventListener("animationend", treasureRestart);
  document
    .querySelector("#rum_container")
    .addEventListener("animationend", rumRestart);
}

function startSounds() {
  document.querySelector("#background_music").play();
  document.querySelector("#background_music").volume = 0.3;
  document.querySelector("#skull_sound").volume = 0.3;
}

// ======= Click treasure Functions ======= //
function clickTreasure() {
  console.log("Click");
  let treasure = this;
  document.querySelector("#treasure_click").currentTime = 0;
  document.querySelector("#treasure_click").play();
  treasure.removeEventListener("mousedown", clickTreasure);
  treasure.classList.add("paused");
  incrementPoints();
  treasure.querySelector("img").classList.add("zoom_out");
  treasure.addEventListener("animationend", treasureGone);
}

// ======= treasure End Functions ======= //
function treasureGone() {
  // fjern event der bringer os herind
  let treasure = this;
  treasure.removeEventListener("animationend", treasureGone);
  treasure.classList.remove("paused");
  treasure.querySelector("img").classList.remove("zoom_out");
  // genstart jumping animation
  treasureRestart.call(this);
}

function treasureRestart() {
  let treasure = this;
  treasure.classList.remove("jumping1", "jumping2", "jumping3");
  treasure.offsetWidth;
  randomizedJumping.call(this);
  // fjern position class, lav ny position nummer, sæt position class på igen.
  treasure.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6"
  );

  let pos = Math.floor(Math.random() * 6) + 1;
  treasure.classList.add("position" + pos);
  treasure.addEventListener("click", clickTreasure);
}

// tilfældig nummer til jumping animation
function randomizedJumping() {
  let treasure = this;
  let number = Math.floor(Math.random() * 3) + 1;
  treasure.classList.add("jumping" + number);
}

// ======= Increment Points ======= //
function incrementPoints() {
  console.log("Points increment");
  points++;
  // winstate
  if (points >= 10) {
    displayPoints();
    levelComplete();
  } else {
    displayPoints();
  }
}

function displayPoints() {
  document.querySelector("#treasure_count").textContent = points;
}

// ======= Click skull Function ======= //
function clickSkull() {
  console.log("Click skull");
  document.querySelector("#skull_sound").play();
  let skull = document.querySelector("#skull_container");
  skull.removeEventListener("mousedown", clickSkull);
  skull.classList.add("paused");
  skull.querySelector("img").classList.add("zoom_in");
  skull.addEventListener("animationend", skullGone);
  decrementLives();
}

function skullGone() {
  // fjern event der bringer os herind
  let skull = document.querySelector("#skull_container");
  skull.removeEventListener("animationend", skullGone);
  skull.querySelector("img").classList.remove("zoom_in");
  skull.classList.remove("paused");
  skull.classList.remove("jumping");
  skull.offsetWidth;
  skull.classList.add("jumping");
  skull.addEventListener("mousedown", clickSkull);
}

// ======= Click rum Function ======= //
function clickRum() {
  console.log("click rum");
  let rum = document.querySelector("#rum_container");
  if (lives >= 3) {
    incrementPoints(); 
    incrementPoints();
} else {
    incrementLives;
}
  rum.removeEventListener("mousedown", clickRum);
  rum.classList.add("paused");
  rum.querySelector("img").classList.add("zoom_out");
  rum.addEventListener("animationend", rumGone);
  
}

function rumGone() {
  let rum = document.querySelector("#rum_container");
  rum.removeEventListener("animationend", rumGone);
  rum.querySelector("img").classList.remove("zoom_out");
  rum.classList.remove("paused");
  rum.classList.remove("jumping_rum");
  rum.offsetWidth;
  rum.classList.add("jumping_rum");
  rum.addEventListener("mousedown", clickRum);
}

function rumRestart() {
  let rum = document.querySelector("#rum_container");
  rum.removeEventListener("animationend", rumRestart);
  rum.classList.remove("jumping_rum");
  rum.offsetWidth;
  rum.classList.add("jumping_rum");
  rum.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6"
  );

  let pos = Math.floor(Math.random() * 6) + 1;
  rum.classList.add("position" + pos);
  rum.addEventListener("animationend", rumRestart);
}

// ======= Increment lives ======= //
function incrementLives() {
  displayIncrementedLives();
  lives++;
}

function displayIncrementedLives() {
  console.log("#rum" + lives);
  document.querySelector("#rum" + lives).classList.remove("broken_rum");
  document.querySelector("#rum" + lives).classList.add("active_rum");
}

// ======= Decrement lives ======= //
function decrementLives() {
  lives--;
  if (lives === 0) {
    gameOver();
  } else {
    displayDecrementedLives();
  }
}

function displayDecrementedLives() {
  console.log("#rum" + lives);
  document.querySelector("#rum" + lives).classList.remove("active_rum");
  document.querySelector("#rum" + lives).classList.add("broken_rum");
}

function gameOver() {
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#skull_sound").pause();
  document.querySelector("#background_music").pause();
  document.querySelector("#death_music").play();
  document.querySelector("#death_music").loop = true;
  document.querySelector("#crying_man").play();
  document.querySelector("#crying_man").loop = true;
  document.querySelector("#crying_man").volume = 0.6;
  console.log("GAME OVER.");
}

function levelComplete() {
  console.log("LEVEL COMPLETE!");
  document.querySelector("#level_complete").classList.remove("hidden");
}
