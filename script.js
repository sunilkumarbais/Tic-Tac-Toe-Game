const boxes = document.querySelectorAll(".box");
const playButton = document.querySelector(".playBtn");
const winningContainer = document.querySelector(".winnigContainer");
const themeToggle = document.querySelector(".theme-toggle");
let currentPlayer = "X";
let board = Array(9).fill("");
let gameOver = false;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const handleClick = (event, index) => {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  event.target.innerHTML = currentPlayer;

  if (checkWinner()) return;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

boxes.forEach((box, index) => 
  box.addEventListener("click", (event) => handleClick(event, index))
);

const checkWinner = () => {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningContainer.innerHTML = `Congratulation! ${currentPlayer} wins this game.`;
      gameOver = true;
      highlightWinningCombo(combo);
      showPlayButton();
      return true;
    }
  }

  if (!board.includes("")) {
    winningContainer.innerHTML = "This game is a draw.";
    gameOver = true;
    showPlayButton();
    return true;
  }
  return false;
};

const highlightWinningCombo = (combo) => {
  combo.forEach(index => {
    boxes[index].classList.add("winner");
  });
};

const showPlayButton = () => {
  playButton.style.display = "block";
  playButton.addEventListener("click", resetGame);
};

const resetGame = () => {
  board.fill("");
  boxes.forEach(box => {
    box.innerHTML = "";
    box.classList.remove("winner");
  });
  currentPlayer = "X";
  winningContainer.innerHTML = "";
  playButton.style.display = "none";
  gameOver = false;
};

// Theme Toggle Logic
const toggleTheme = () => {
  document.body.classList.toggle("dark-mode");
};

themeToggle.addEventListener("click", toggleTheme);
