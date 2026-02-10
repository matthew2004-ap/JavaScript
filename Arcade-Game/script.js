const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const targetLabelEl = document.getElementById('targetLabel');
const gridEl = document.getElementById('grid');
const messageEl = document.getElementById('message');
const startBtn = document.getElementById('startBtn');

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Teal', 'Brown'];

let score = 0;
let timeLeft = 30;
let targetColor = '';
let timerId;
let gameRunning = false;

function pickTarget() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  targetLabelEl.textContent = targetColor;
}

function renderGrid() {
  gridEl.innerHTML = '';
  const shuffled = [...colors].sort(() => Math.random() - 0.5);

  shuffled.forEach((colorName) => {
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.type = 'button';
    tile.style.backgroundColor = colorName.toLowerCase();
    tile.setAttribute('aria-label', colorName);

    tile.addEventListener('click', () => {
      if (!gameRunning) return;
      if (colorName === targetColor) {
        score += 1;
        messageEl.textContent = '✅ Nice catch!';
        pickTarget();
        renderGrid();
      } else {
        score = Math.max(0, score - 1);
        messageEl.textContent = '❌ Wrong tile! Try again.';
      }
      scoreEl.textContent = score;
    });

    gridEl.appendChild(tile);
  });
}

function endGame() {
  gameRunning = false;
  clearInterval(timerId);
  messageEl.textContent = `⏰ Time up! Final score: ${score}`;
  startBtn.disabled = false;
  startBtn.textContent = 'Play Again';
}

function startGame() {
  score = 0;
  timeLeft = 30;
  gameRunning = true;
  startBtn.disabled = true;
  messageEl.textContent = 'Game started. Catch the target color!';

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  pickTarget();
  renderGrid();

  timerId = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

startBtn.addEventListener('click', startGame);
renderGrid();
