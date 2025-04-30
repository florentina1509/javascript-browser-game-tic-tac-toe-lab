/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];


/*---------------------------- Variables (state) ----------------------------*/
let board;   // Will hold an array representing the board (9 squares)
let turn;    // Will track whose turn it is ('X' or 'O')
let winner;  // Will track if someone has won (null, 'X', or 'O')
let tie;     // Will track if the game ended in a tie (true or false)


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr'); // selects all squares
const messageEl = document.getElementById('message');   // selects the message display
const resetBtnEl = document.getElementById('reset');

console.log(squareEls);  // Check if you grabbed all 9 squares
console.log(messageEl);  // Check if you grabbed the message element



/*-------------------------------- Functions --------------------------------*/
function init() {
  console.log('Init function is running!'); 
  board = ['X', 'O', '', '', '', '', '', '', '']; // 9 empty squares
  turn = 'X';    // Player X goes first
  winner = false; // No winner at the start
  tie = false;    // No tie at the start
  render();      // Call render (will set up the board display)
}

// Call init when the page loads
init();

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
  const squareIndex = parseInt(event.target.id); // Get the index from the clicked square's id
  if (board[squareIndex] !== '' || winner) return; // If square is taken OR game over, do nothing

  placePiece (squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();

function placePiece(index) {
  board[index] = turn;  // Set the board at that index to 'X' or 'O'
  console.log(board);   
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo; // Destructure the three indexes

    if (
      board[a] !== '' &&  // First square must not be empty
      board[a] === board[b] && // First must match second
      board[a] === board[c]    // First must match third
    ) {
      winner = true; 
      return;
    }
  }
  winner = false; 
}

function checkForTie() {
  if (winner) return; 

  if (!board.includes('')) {
    tie = true;  
  } else {
    tie = false; 

    console.log('Tie Status:', tie)

    function switchPlayerTurn() {
      if (winner) return; 
    
      turn = (turn === 'X') ? 'O' : 'X'; 
      console.log('Turn switched to:', turn); 
    }
    
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
  });

resetBtnEl.addEventListener('click', init);




