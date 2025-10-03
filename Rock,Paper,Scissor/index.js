//Rock-Paper-Scissors Programs

const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");


const computerDisplay = document.getElementById("computerDisplay");

const resultDisplay = document.getElementById("resultDisplay");


const playerScoreDisplay = document.getElementById("playerScoreDisplay");


const computerScoreDisplay = document.getElementById("computerScoreDisplay");

let playerScore = 0;
let computerScore = 0;

let timeLeft = 180; // 3 minutes in seconds
let timerInterval = null;
const timerDisplay = document.getElementById('timer');
const trophyDisplay = document.getElementById('trophy');

// Call this function when the game starts
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds}`;
}

// Call this function when time runs out
function endGame() {
    // Disable further moves (implement this according to your game logic)
    // For example, disable buttons:
    document.querySelectorAll('button').forEach(btn => btn.disabled = true);

    // Determine winner (replace with your actual score variables)
    let playerScore = window.playerScore || 0;
    let computerScore = window.computerScore || 0;
    let winnerText = '';
    if (playerScore > computerScore) {
        winnerText = "🏆 Player Wins!";
    } else if (computerScore > playerScore) {
        winnerText = "🏆 Computer Wins!";
    } else {
        winnerText = "🤝 It's a Tie!";
    }
    trophyDisplay.style.display = 'block';
    trophyDisplay.textContent = winnerText;
}

function playGame(playerChoice) {


  const computerChoice = choices[Math.floor(Math.random() * 3)]; 

  let result = "";

  if (playerChoice=== computerChoice) {
      result = " IT'S A TIE";

  }

  else{

   switch (playerChoice){
         case "rock":
            result = (computerChoice === "scissors") ? "YOU WIN!" : "YOU LOSE!";
             break;

          case "paper":
            result = (computerChoice === "rock") ? "YOU WIN!" : "YOU LOSE!";
             break;

             
          case "scissors":
            result = (computerChoice === "paper") ? "YOU WIN!" : "YOU LOSE!";
             break;
      }
  

    }
    playerDisplay.textContent = `PLAYER: ${playerChoice}`;

   computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
   resultDisplay.textContent = result;

   resultDisplay.classList.remove("greenText", "redText");

   switch(result){
      case "YOU WIN!":
         resultDisplay.classList.add("greenText");
         playerScore++;
         playerScoreDisplay.textContent = playerScore;
         break;

         case "YOU LOSE!":
         resultDisplay.classList.add("redText");
         computerScore++;
         computerScoreDisplay.textContent = computerScore
         break;
   }
}

// Start the timer when the game starts (call this in your game start logic)
startTimer();