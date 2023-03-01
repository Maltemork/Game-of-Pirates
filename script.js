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
}

function startPositions() {
  document.querySelector("#treasure1_container").classList.add("position1");
  document.querySelector("#treasure2_container").classList.add("position2");
  document.querySelector("#treasure3_container").classList.add("position3");
  document.querySelector("#skull_container").classList.add("position4");
  document.querySelector("#rum_container").classList.add("position5");
}

function startClicks() {
  document
    .querySelector("#treasure1_container")
    .addEventListener("click", clickTreasure);
  document
    .querySelector("#treasure2_container")
    .addEventListener("click", clickTreasure);
  document
    .querySelector("#treasure3_container")
    .addEventListener("click", clickTreasure);
  document
    .querySelector("#skull_container")
    .addEventListener("click", clickSkull);
  document.querySelector("#rum_container").addEventListener("click", clickRum);
}

function startAnimations() {
  document.querySelector("#treasure1_container").classList.add("jumping3");
  document.querySelector("#treasure2_container").classList.add("jumping3");
  document.querySelector("#treasure3_container").classList.add("jumping3");
  document.querySelector("#skull_container").classList.add("jumping2");
  document.querySelector("#rum_container").classList.add("jumping1");
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
    .addEventListener("animationend", treasureRestart);
}

// ======= Click treasure Functions ======= //
function clickTreasure() {
  console.log("Click");
  let treasure = this;
  // Forhindr gentagne clicks
  treasure.removeEventListener("click", clickTreasure);
  // Stop treasure container
  treasure.classList.add("paused");
  //tæl point
  incrementPoints();
  // sæt forsvind-animation på treasure
  treasure.querySelector("img").classList.add("zoom_out");
  // når forsvind-animation er færdig: treasureGone
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

function randomizedJumping() {
  let treasure = this;
  let number = Math.floor(Math.random() * 3) + 1;
  treasure.classList.add("jumping" + number);
}

// ======= Increment Points ======= //
function incrementPoints() {
  console.log("Points increment");
  points++;
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
  let skull = document.querySelector("#skull_container");
  // Forhindr gentagne clicks
  skull.removeEventListener("click", clickSkull);
  // Stop skull container
  skull.classList.add("paused");
  // sæt forsvind-animation på skull
  skull.querySelector("img").classList.add("zoom_in");
  // når forsvind-animation er færdig: skullGone
  skull.addEventListener("animationend", skullGone);
  // Fjern liv
  decrementLives();
}

function skullGone() {
  // fjern event der bringer os herind
  let skull = document.querySelector("#skull_container");
  skull.removeEventListener("animationend", skullGone);

  // fjern forsvind-animation
  skull.querySelector("img").classList.remove("zoom_in");

  // fjern pause
  skull.classList.remove("paused");

  // genstart jumping animation
  skull.classList.remove("jumping");
  skull.offsetWidth;
  skull.classList.add("jumping");

  // gør det muligt at klikke på skull igen
  skull.addEventListener("click", clickSkull);
}

// ======= Click rum Function ======= //
function clickRum() {
  console.log("click rum");
  let rum = document.querySelector("#rum_container");
  // Forhindr gentagne clicks
  rum.removeEventListener("click", clickRum);
  // Stop rum container
  rum.classList.add("paused");
  // sæt forsvind-animation på rum
  rum.querySelector("img").classList.add("zoom_out");
  // når forsvind-animation er færdig: rumGone
  rum.addEventListener("animationend", rumGone);
  incrementLives();
}

function rumGone() {
  let rum = document.querySelector("#rum_container");
  // fjern event der bringer os herind
  rum.removeEventListener("animationend", rumGone);

  // fjern forsvind-animation
  rum.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  rum.classList.remove("paused");

  // genstart jumping animation
  rum.classList.remove("jumping");
  rum.offsetWidth;
  rum.classList.add("jumping");

  // gør det muligt at klikke på rum igen
  rum.addEventListener("click", clickRum);
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
  console.log("GAME OVER.");
}

function levelComplete() {
  console.log("LEVEL COMPLETE!");
  document.querySelector("#level_complete").classList.remove("hidden");
}
