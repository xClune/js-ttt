// Create the grid:
createBoard(3, 3);

function createBoard(rows, columns){
        const gridContainer = document.querySelector('.grid-container');

        let board = [];
        let turn = 'X';

        // Generate Cells
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < columns; j++){
                let cell = document.createElement('div');
                cell.classList.add('cell');
                gridContainer.appendChild(cell);
                board.push(0);
            }
        }

        // Event listeners for click
        let squares = document.querySelectorAll('.cell');
        for (const square of squares) {
            square.addEventListener('click', () => {
                if (!square.classList.contains('selected')){
                    square.classList.toggle('selected');
                    playTurn();
                }
            })
        }
    }

// Switch turn
function switchTurn(playerTurn) {
    if (playerTurn == 'X'){
        playerTurn = 'O';
    } else {
        playerTurn = 'X';
    }
}

// Game controller

function playTurn() {
    // get board state
    let board = []

    let squares = document.querySelectorAll('.cell');
    for (const square of squares) {
        if (!square.classList.contains('selected')){
            board.push(0);
        } else {
            board.push(1);
        }
    }
    console.log(board);
}
// Determine winner




