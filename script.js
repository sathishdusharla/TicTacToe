let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';

function startGame() {
  player1Name = document.getElementById('player1').value;
  player2Name = document.getElementById('player2').value;

  if (player1Name === '' || player2Name === '') {
    alert('Please enter names for both players.');
    return;
  }

  document.querySelector('.players').style.display = 'none';
  document.getElementById('board').innerHTML = '';
  document.getElementById('newGameBtn').style.display = 'none';
  createBoard();
}

function createBoard() {
  for (let i = 0; i < 3; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement('button');
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      cell.addEventListener('click', handleClick);
      row.appendChild(cell);
    }
    document.getElementById('board').appendChild(row);
  }
}

function handleClick(event) {
  let cell = event.target;
  if (cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  if (checkWin()) {
    alert(`${currentPlayer === 'X' ? player1Name : player2Name} wins!`);
    endGame();
  } else if (checkDraw()) {
    alert('It\'s a draw!');
    endGame();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  const rows = document.querySelectorAll('.row');
  const board = [...rows].map(row => [...row.children].map(cell => cell.textContent));
  
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return true;
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] && board[0][j] === board[1][j] && board[1][j] === board[2][j]) return true;
  }

  // Check diagonals
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true;

  return false;
}

function checkDraw() {
  const rows = document.querySelectorAll('.row');
  const board = [...rows].map(row => [...row.children].map(cell => cell.textContent));
  return board.every(row => row.every(cell => cell));
}

function endGame() {
  document.getElementById('newGameBtn').style.display = 'block';
}

function newGame() {
  currentPlayer = 'X';
  document.querySelector('.players').style.display = 'block';
  document.getElementById('board').innerHTML = '';
  document.getElementById('newGameBtn').style.display = 'none';
  document.getElementById('player1').value = '';
  document.getElementById('player2').value = '';
}