// Create the board:
function createBoard(){
        const gridContainer = document.querySelector('.grid-container');

        const rows = 3;
        const columns = 3;

        let board = [];

        // Generate Cells
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++){
                // Create grid on page
                let cell = document.createElement('div');
                cell.classList.add('cell');
                gridContainer.appendChild(cell);

                // Create actual board state
                board.push(Cell());
            }
        }

        // Event listeners for click
        let squares = document.querySelectorAll('.cell');
        for (const [index, square] of squares.entries()) {
            square.addEventListener('click', () => {
                if (!square.classList.contains('selected')){
                    square.classList.toggle('selected');
                    square.innerText = `${GameController().getActivePlayer()}`
                    GameController().playRound(board[index])
                }
            })
        }

        // method to retrieve board
        const getBoard = () => board;

        const checkSquare = (square, player) => {
            if (square.getValue() === 0){
                square.selectSquare(player);
            }
        }

    return {
        getBoard,
        checkSquare
    }
}

function Cell() {
    let value = 0;

    // create method for changing square value onclick
    const selectSquare = (player) => {
        value = player;
    };

    // method for retreiving value of square
    const getValue = () => value;

    return {
        selectSquare,
        getValue
    };
}

// Game controller
function GameController() {
    const board = createBoard();
    let gameText = document.querySelector('.game-text');
  
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === 'X' ? 'O' : 'X';
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      gameText.innerText = `${activePlayer}'s turn.`;
    };
  
    const playRound = (square) => {

        // change value of square to player token
        board.checkSquare(square, activePlayer);
    
        // Switch player turn
        switchPlayerTurn();
        printNewRound();
    };
    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
      playRound,
      getActivePlayer
    };
}

var activePlayer = 'X';
const game = GameController();
  
// Determine winner




