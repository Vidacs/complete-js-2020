/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, winnerScore, playerGaming;
const btn_roll = document.querySelector(".btn-roll");
const btn_hold = document.querySelector(".btn-hold");
const btn_newgame = document.querySelector(".btn-new");

btn_newgame.addEventListener("click", init);

btn_roll.addEventListener("click", function() {
  if (playerGaming) {
    // Generate Random Number
    const seed = Math.floor(Math.random() * 6) + 1;
    roundScore += seed;

    //Update UI
    document.querySelector(".dice").src = `../pig-game/assets/dice-${seed}.png`;
    document.querySelector(".dice").style.display = "block";

    if (seed != 1) {
      document.getElementById(
        `current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

btn_hold.addEventListener("click", function() {
  if (playerGaming) {
    scores[activePlayer] += roundScore;
    // update score
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= winnerScore) {
      playerGaming = false;

      document.getElementById(`current-${activePlayer}`).textContent = "0";
      document.querySelector(".player-0-panel").classList.remove("active");
      document.querySelector(".player-1-panel").classList.remove("active");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document.getElementById(`name-${activePlayer}`).textContent = "Winner";
    } else {
      // go to next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  roundScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  document.querySelector(".dice").style.display = "none";

  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);

  document.getElementById(`current-${activePlayer}`).textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  playerGaming = true;

  winnerScore = prompt("Please enter the winner Score for game:", "");
  if (winnerScore == null || winnerScore == "") {
    alert("if no enter a value, The winner score game is 100 by default");
    winnerScore = 100;
  }

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
}
