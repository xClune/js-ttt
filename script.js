// Create the board:
const game = GameController();

function createBoard(){
        let gridContainer = document.querySelector('.grid-container');

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
                    square.innerText = `${game.getActivePlayer()}`;
                    game.playRound(board[index]);
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

        // const resetBoard = () => {
        //     for (let cell of board){
        //         cell.selectSquare(0);
        //     }
        //     gridContainer.innerHTML = '';
        //     createBoard();
        // }

    return {
        getBoard,
        checkSquare,
        // resetBoard
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

    let activePlayer = 'X';

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

        boardState = (board.getBoard().map((cell) => cell.getValue()));

        if (checkWinner(boardState)){
            gameText.innerText = `${activePlayer} wins!`;
            return;
        }
    
        // Switch player turn
        switchPlayerTurn();
        printNewRound();
    };

    // Initial play game message
    printNewRound();
  
    return {
      playRound,
      getActivePlayer
    };
}
  
// Determine winner
function checkWinner(board) {
    //Check for winner
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [6, 4, 2],
        [2, 5, 8],
        [1, 4, 7],
        [0, 3, 6],
      ]

    for (combo of winCombos) {
        if (board[combo[0]] != 0 && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            return true;
        }
    }
    return false;
}



