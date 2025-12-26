const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const boardDiv = document.getElementById('board');
const messageDiv = boardDiv.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1, player2;
let currentPlayer;
let board = Array(9).fill(null);

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // columns
  [0,4,8],[2,4,6]          // diagonals
];

submitBtn.addEventListener('click', () => {
  player1 = player1Input.value.trim() || "Player 1";
  player2 = player2Input.value.trim() || "Player 2";
  currentPlayer = player1;

  document.getElementById('players-form').style.display = 'none';
  boardDiv.style.display = 'block';
  messageDiv.textContent = `${currentPlayer}, you're up!`;

  cells.forEach(cell => cell.textContent = '');
  board.fill(null);
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id) - 1;
    if (board[index] || checkWinner()) return; // Already filled or game over

    board[index] = currentPlayer === player1 ? 'X' : 'O';
    cell.textContent = board[index];

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer} congratulations, you won!`;
      return;
    }

    // Check tie
    if (board.every(cell => cell)) {
      messageDiv.textContent = `It's a tie!`;
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  });
});

function checkWinner() {
  for (let combo of winningCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

