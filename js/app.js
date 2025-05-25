/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((cell, idx) => {
    squareEls[idx].textContent = cell;
  });
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `Player ${turn}'s Turn`;
  } else if (!winner && tie) {
    messageEl.textContent = "It's a Tie!";
  } else {
    messageEl.textContent = `Congratulations ${turn}! You Won!`;
  }
}

function handleClick(event) {
  const squareIndex = parseInt(event.target.id);
  if (board[squareIndex] !== '' || winner) return;

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      winner = true;
      return;
    }
  }
  winner = false;
}

function checkForTie() {
  if (winner) return;

  tie = !board.includes('');
}

function switchPlayerTurn() {
  if (winner) return;
  turn = (turn === 'X') ? 'O' : 'X';
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);

/*------------------------------- Init Call ---------------------------------*/
init();
