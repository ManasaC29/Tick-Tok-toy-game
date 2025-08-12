document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll('.cell');
  const statusText = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  let currentPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6]           // Diagonals
  ];

  function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);

    if (checkWin()) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      gameActive = false;
    } else if (!board.includes("")) {
      statusText.textContent = "It's a Draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }

  function checkWin() {
    return winConditions.some(combo => {
      const [a, b, c] = combo;
      return board[a] === currentPlayer &&
             board[a] === board[b] &&
             board[a] === board[c];
    });
  }

  function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("X", "O");
    });
  }

  cells.forEach(cell => cell.addEventListener("click", handleClick));
  restartBtn.addEventListener("click", restartGame);
});
