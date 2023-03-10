"use strict";
window.addEventListener("load", ready);

// ======= Variables ======= //
let points = 0;
let lives = 3;
let isGameRunning = false;
let highScore = 0;
// ======= Page load start screen ======= //
function ready() {
  document
    .querySelector("#btn_start_game")
    .addEventListener("click", startGame);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
  document.querySelector("#btn_gameover").addEventListener("click", startGame);
  document
    .querySelector("#btn_go_to_start1")
    .addEventListener("click", restartGame);
  document
    .querySelector("#btn_go_to_start2")
    .addEventListener("click", restartGame);
  showStartScreen();
}

function showStartScreen() {
  // fjern hidden fra startskærm og tilføj til game over og level complete
  document.querySelector("#game_start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

// =============== START GAME FUNCTIONS ========== //
function startGame() {
  resetLives();
  resetPoints();
  isGameRunning = true;
  showGameScreen();
  startTimer();
  console.log("Game started!");
  startAnimations();
  startClicks();
  startPositions();
  startSounds();
}

function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#game_start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function resetLives() {
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (hjerte vi ser)
  document.querySelector("#rum1").classList.remove("broken_rum");
  document.querySelector("#rum2").classList.remove("broken_rum");
  document.querySelector("#rum3").classList.remove("broken_rum");
  document.querySelector("#rum1").classList.add("active_rum");
  document.querySelector("#rum2").classList.add("active_rum");
  document.querySelector("#rum3").classList.add("active_rum");
}

function resetPoints() {
  points = 0;
  displayPoints();
}

function startTimer() {
  // Sæt timer-animationen (shrink) i gang ved at tilføje klassen shrink til time_sprite
  document.querySelector("#time_sprite").classList.remove("paused");
  document.querySelector("#time_sprite").classList.remove("shrink");
  document.querySelector("#time_sprite").offsetWidth;
  document.querySelector("#time_sprite").classList.add("shrink");

  // Tilføj en eventlistener som lytter efter at animationen er færdig (animationend) og kalder funktionen timeIsUp
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", timeIsUp);
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
  document
    .querySelector("#rum_container")
    .addEventListener("mousedown", clickRum);
}

function startAnimations() {
  //fjern paused
  document.querySelector("#treasure1_container").classList.remove("paused");
  document.querySelector("#treasure2_container").classList.remove("paused");
  document.querySelector("#treasure3_container").classList.remove("paused");
  document.querySelector("#skull_container").classList.remove("paused");
  document.querySelector("#rum_container").classList.remove("paused");

  //fjern animations
  document
    .querySelector("#treasure1_container")
    .classList.remove("jumping1", "jumping2", "jumping3");
  document
    .querySelector("#treasure2_container")
    .classList.remove("jumping1", "jumping2", "jumping3");
  document
    .querySelector("#treasure3_container")
    .classList.remove("jumping1", "jumping2", "jumping3");
  document.querySelector("#skull_container").classList.remove("jumping_skull");
  document.querySelector("#rum_container").classList.remove("jumping_rum");

  //opdater containers
  document.querySelector("#treasure1_container").offsetWidth;
  document.querySelector("#treasure2_container").offsetWidth;
  document.querySelector("#treasure3_container").offsetWidth;
  document.querySelector("#skull_container").coffsetWidth;
  document.querySelector("#rum_container").offsetWidth;
  //tilføj animations
  document.querySelector("#treasure1_container").classList.add("jumping2");
  document.querySelector("#treasure2_container").classList.add("jumping3");
  document.querySelector("#treasure3_container").classList.add("jumping1");
  document.querySelector("#skull_container").classList.add("jumping_skull");
  document.querySelector("#rum_container").classList.add("jumping_rum");
  //sæt
  animationEnd();
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
    .addEventListener("animationend", skullRestart);
  document
    .querySelector("#rum_container")
    .addEventListener("animationend", rumRestart);
}

function startSounds() {
  document.querySelector("#death_music").pause();
  document.querySelector("#crying_man").pause();
  document.querySelector("#background_music").currentTime = 0;
  document.querySelector("#background_music").play();
  document.querySelector("#background_music").volume = 0.3;
  document.querySelector("#skull_sound").volume = 0.3;
}
// ======== START GAME FUNCTIONS =========== //

// ======= Click treasure Functions ======= //
function clickTreasure() {
  console.log("Click");
  let treasure = this;
  treasure.removeEventListener("mousedown", clickTreasure);
  console.log(this);
  document.querySelector("#treasure_click").currentTime = 0;
  document.querySelector("#treasure_click").play();
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
  if (isGameRunning) {
    treasure.addEventListener("mousedown", clickTreasure);
    treasureRestart.call(this);
  }
}

function treasureRestart() {
  let treasure = this;
  treasure.removeEventListener("animationend", treasureRestart);
  treasure.classList.remove("jumping1", "jumping2", "jumping3");
  treasure.offsetWidth;
  let number = Math.floor(Math.random() * 3) + 1;
  treasure.classList.add("jumping" + number);
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
  treasure.addEventListener("animationend", treasureRestart);
}

// tilfældig nummer til jumping animation

// ======= Increment Points ======= //
function incrementPoints() {
  console.log("Points increment");
  points++;
  // winstate
  displayPoints();
}

function displayPoints() {
  document.querySelector("#treasure_count").textContent = points;
}

// ======= Click skull Function ======= //
function clickSkull() {
  console.log("Click skull");
  document.querySelector("#skull_sound").currentTime = 0;
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

  if (isGameRunning) {
    skull.addEventListener("mousedown", clickSkull);
    skull.classList.remove("paused");
    skullRestart();
  }
}

function skullRestart() {
  // fjern event der bringer os herind
  let skull = this;
  skull.removeEventListener("animationend", skullRestart);
  skull.classList.remove("jumping_skull");
  skull.offsetWidth;
  skull.classList.add("jumping_skull");
  skull.classList.remove(
    "position1",
    "position2",
    "position3", 
    "position4",
    "position5",
    "position6"
  );

  let pos = Math.floor(Math.random() * 6) + 1;
  skull.classList.add("position" + pos);
  skull.addEventListener("animationend", skullRestart);
}

// ======= Click rum Function ======= //
function clickRum() {
  let rum = this;
  document.querySelector("#rum_sound").currentTime = 0;
  document.querySelector("#rum_sound").volume = 0.5;
  document.querySelector("#rum_sound").play();
  console.log("click rum");
  rum.removeEventListener("mousedown", clickRum);
  checkLives();
  rum.classList.add("paused");
  rum.querySelector("img").classList.add("zoom_out");
  rum.addEventListener("animationend", rumGone);
}

function checkLives() {
  if (lives >= 3) {
    incrementPoints();
    incrementPoints();
  } else {
    incrementLives();
  }
}

function rumGone() {
  let rum = document.querySelector("#rum_container");
  rum.removeEventListener("animationend", rumGone);
  rum.querySelector("img").classList.remove("zoom_out");
  if (isGameRunning) {
    rumRestart();
  }
}

function rumRestart() {
  let rum = document.querySelector("#rum_container");
  rum.removeEventListener("mousedown", clickRum);
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
  rum.classList.remove("paused");
  rum.addEventListener("animationend", rumRestart);
  rum.addEventListener("mousedown", clickRum);
}

// ======= Increment lives ======= //
function incrementLives() {
  lives++;
  displayIncrementedLives();
}

function displayIncrementedLives() {
  console.log("#rum" + lives);
  document.querySelector("#rum" + lives).classList.remove("broken_rum");
  document.querySelector("#rum" + lives).classList.add("active_rum");
}

// ======= Decrement lives ======= //
function decrementLives() {
  if (lives === 1) {
    document.querySelector("#end_text").textContent = `You ran out of lives!`;
    gameOver();
  } else {
    displayDecrementedLives();
  }
  lives--;
}

function displayDecrementedLives() {
  console.log("#rum" + lives);
  document.querySelector("#rum" + lives).classList.remove("active_rum");
  document.querySelector("#rum" + lives).classList.add("broken_rum");
}

function gameOver() {
  document.querySelector(
    "#score_lose"
  ).textContent = `You got ${points} points.`;

  //gameover animation.
  document.querySelector("#game_over").classList.remove("screen_animation");
  document.querySelector("#game_over").offsetWidth;
  document.querySelector("#game_over").classList.add("screen_animation");
  document.querySelector("#game_over").classList.remove("hidden");
  document
    .querySelector("#game_over")
    .addEventListener("animationend", stopGame);
  //sounds
  document.querySelector("#skull_sound").pause();
  document.querySelector("#background_music").pause();
  document.querySelector("#death_music").currentTime = 0;
  document.querySelector("#death_music").play();
  document.querySelector("#death_music").loop = true;
  document.querySelector("#crying_man").currentTime = 0;
  document.querySelector("#crying_man").play();
  document.querySelector("#crying_man").loop = true;
  document.querySelector("#crying_man").volume = 0.6;

  //restart game
  console.log("GAME OVER.");
}

function levelComplete() {
  document
    .querySelector("#level_complete")
    .classList.remove("screen_animation");
  document.querySelector("#level_complete").offsetWidth;
  document.querySelector("#level_complete").classList.add("screen_animation");
  document.querySelector("#level_complete").classList.remove("hidden");
  document
    .querySelector("#level_complete")
    .addEventListener("animationend", stopGame);
  if (highScore < points) {
    highScore = points;
  }
  document.querySelector(
    "#highscore_win"
  ).textContent = `Highscore: ${highScore}`;
  console.log("LEVEL COMPLETE!");
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#complete_score").textContent = `Score: ${points}`;
}

function restartGame() {
  document.querySelector("#crying_man").pause();
  document.querySelector("#death_music").pause();
  document.querySelector("#background_music").play();
  showStartScreen();
}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 25) {
    levelComplete();
  } else {
    document.querySelector(
      "#end_text"
    ).textContent = `You did not get 25 points before the time ran out.`;
    gameOver();
  }
}

function stopGame() {
  isGameRunning = false;

  //fjern jumping
  document
    .querySelector("#treasure1_container")
    .classList.remove("jumping1", "jumping2", "jumping3");
  document
    .querySelector("#treasure2_container")
    .classList.remove("jumping1", "jumping2", "jumping3");
  document
    .querySelector("#treasure3_container")
    .classList.remove("jumping1", "jumping2", "jumping3");

  document.querySelector("#skull_container").classList.remove("jumping_skull");
  document.querySelector("#rum_container").classList.remove("jumping_rum");
  document.querySelector("#time_sprite").classList.add("paused");

  //fjern event listeners
  document
    .querySelector("#treasure1_container")
    .removeEventListener("mousedown", clickTreasure);
  document
    .querySelector("#treasure2_container")
    .removeEventListener("mousedown", clickTreasure);
  document
    .querySelector("#treasure3_container")
    .removeEventListener("mousedown", clickTreasure);
  document
    .querySelector("#skull_container")
    .removeEventListener("mousedown", clickSkull);
  document
    .querySelector("#rum_container")
    .removeEventListener("mousedown", clickRum);
}
