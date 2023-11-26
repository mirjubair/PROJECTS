const cells = document.querySelectorAll('[data-cell]');
const message = document.querySelector('.message');
let currentPlayer = 'X';
let isGameOver = false;

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
  const cell = e.target;

  if (cell.textContent || isGameOver) return;

  cell.textContent = currentPlayer;
  cell.classList.add('filled');

  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    isGameOver = true;
  } else if ([...cells].every(cell => cell.textContent)) {
    message.textContent = 'It\'s a draw!';
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
  });
}
