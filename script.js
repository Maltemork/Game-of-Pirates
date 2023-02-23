"use strict";
window.addEventListener("load", start);

// ======= Variables ======= //
let points = 0;
let lives = 3;

// ======= Start ======= //
function start() {
  console.log("JavaScript kører!");

  // Start animationer
  document.querySelector("#treasure1_container").classList.add("jumping");
  document.querySelector("#treasure2_container").classList.add("jumping");
  document.querySelector("#treasure3_container").classList.add("jumping");
  document.querySelector("#skull_container").classList.add("jumping");
  document.querySelector("#rum_container").classList.add("jumping");

  // Registrer click
  document
    .querySelector("#treasure1_container")
    .addEventListener("click", clickTreasure1);
  document
    .querySelector("#treasure2_container")
    .addEventListener("click", clickTreasure2);
  document
    .querySelector("#treasure3_container")
    .addEventListener("click", clickTreasure3);
  document
    .querySelector("#skull_container")
    .addEventListener("click", clickSkull);
  document.querySelector("#rum_container").addEventListener("click", clickrum);
}

// ======= Click treasure Functions ======= //
function clickTreasure1() {
  console.log("Click");
  // Forhindr gentagne clicks
  document
    .querySelector("#treasure1_container")
    .removeEventListener("click", clickTreasure1);

  // Stop treasure container
  document.querySelector("#treasure1_container").classList.add("paused");

  //tæl point
  incrementPoints();

  // sæt forsvind-animation på treasure
  document.querySelector("#treasure1_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: treasureGone
  document
    .querySelector("#treasure1_container")
    .addEventListener("animationend", treasureGone);
}

function clickTreasure2() {
  console.log("Click treasure2");
  // Forhindr gentagne clicks
  document
    .querySelector("#treasure2_container")
    .removeEventListener("click", clickTreasure2);

  // Stop treasure container
  document.querySelector("#treasure2_container").classList.add("paused");

  //tæl point
  incrementPoints();

  // sæt forsvind-animation på treasure
  document.querySelector("#treasure2_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: treasureGone
  document
    .querySelector("#treasure2_container")
    .addEventListener("animationend", treasureGone2);
}

function clickTreasure3() {
  console.log("Click treasure3");
  // Forhindr gentagne clicks
  document
    .querySelector("#treasure3_container")
    .removeEventListener("click", clickTreasure3);

  // Stop treasure container
  document.querySelector("#treasure3_container").classList.add("paused");

  //tæl point
  incrementPoints();

  // sæt forsvind-animation på treasure
  document.querySelector("#treasure3_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: treasureGone
  document
    .querySelector("#treasure3_container")
    .addEventListener("animationend", treasureGone3);
}

// ======= treasure End Functions ======= //
function treasureGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#treasure1_container")
    .removeEventListener("animationend", treasureGone);

  // fjern forsvind-animation
  document.querySelector("#treasure1_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#treasure1_container").classList.remove("paused");

  // genstart jumping animation
  document.querySelector("#treasure1_container").classList.remove("jumping");
  document.querySelector("#treasure1_container").offsetWidth;
  document.querySelector("#treasure1_container").classList.add("jumping");

  // gør det muligt at klikke på treasure igen
  document
    .querySelector("#treasure1_container")
    .addEventListener("click", clickTreasure1);
}

function treasureGone2() {
  // fjern event der bringer os herind
  document
    .querySelector("#treasure2_container")
    .removeEventListener("animationend", treasureGone2);

  // fjern forsvind-animation
  document.querySelector("#treasure2_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#treasure2_container").classList.remove("paused");

  // genstart jumping animation
  document.querySelector("#treasure2_container").classList.remove("jumping");
  document.querySelector("#treasure2_container").offsetWidth;
  document.querySelector("#treasure2_container").classList.add("jumping");

  // gør det muligt at klikke på treasure igen
  document
    .querySelector("#treasure2_container")
    .addEventListener("click", clickTreasure2);
}

function treasureGone3() {
  // fjern event der bringer os herind
  document
    .querySelector("#treasure3_container")
    .removeEventListener("animationend", treasureGone3);

  // fjern forsvind-animation
  document.querySelector("#treasure3_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#treasure3_container").classList.remove("paused");

  // genstart jumping animation
  document.querySelector("#treasure3_container").classList.remove("jumping");
  document.querySelector("#treasure3_container").offsetWidth;
  document.querySelector("#treasure3_container").classList.add("jumping");

  // gør det muligt at klikke på treasure igen
  document
    .querySelector("#treasure3_container")
    .addEventListener("click", clickTreasure3);
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
  // Forhindr gentagne clicks
  document
    .querySelector("#skull_container")
    .removeEventListener("click", clickSkull);

  // Stop skull container
  document.querySelector("#skull_container").classList.add("paused");

  // sæt forsvind-animation på skull
  document.querySelector("#skull_sprite").classList.add("zoom_in");

  // når forsvind-animation er færdig: skullGone
  document
    .querySelector("#skull_container")
    .addEventListener("animationend", skullGone);
  decrementLives();
}

function skullGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#skull_container")
    .removeEventListener("animationend", skullGone);

  // fjern forsvind-animation
  document.querySelector("#skull_sprite").classList.remove("zoom_in");

  // fjern pause
  document.querySelector("#skull_container").classList.remove("paused");

  // genstart jumping animation
  document.querySelector("#skull_container").classList.remove("jumping");
  document.querySelector("#skull_container").offsetWidth;
  document.querySelector("#skull_container").classList.add("jumping");

  // gør det muligt at klikke på skull igen
  document
    .querySelector("#skull_container")
    .addEventListener("click", clickSkull);
}

// ======= Click rum Function ======= //
function clickrum() {
  console.log("click rum");
  // Forhindr gentagne clicks
  document
    .querySelector("#rum_container")
    .removeEventListener("click", clickrum);

  // Stop rum container
  document.querySelector("#rum_container").classList.add("paused");

  // sæt forsvind-animation på rum
  document.querySelector("#rum_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: rumGone
  document
    .querySelector("#rum_container")
    .addEventListener("animationend", rumGone);

  incrementLives();
}

function rumGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#rum_container")
    .removeEventListener("animationend", rumGone);

  // fjern forsvind-animation
  document.querySelector("#rum_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#rum_container").classList.remove("paused");

  // genstart jumping animation
  document.querySelector("#rum_container").classList.remove("jumping");
  document.querySelector("#rum_container").offsetWidth;
  document.querySelector("#rum_container").classList.add("jumping");

  // gør det muligt at klikke på rum igen
  document.querySelector("#rum_container").addEventListener("click", clickrum);
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
  console.log("GAME OVER.");
  document.querySelector("#game_over").classList.remove("hidden");
}

function levelComplete() {
  console.log("LEVEL COMPLETE!");
  document.querySelector("#level_complete").classList.remove("hidden");
}
