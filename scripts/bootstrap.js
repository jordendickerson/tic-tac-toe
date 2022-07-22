let gameOver = false;
let winner = '';

const gameStatus = document.querySelector('.game-status');
const resetButton = document.querySelector('.reset');

const gameBoard = (() => {
    const gameTiles = document.querySelectorAll('.game-tile');
    let gameTilesArray = ['','','','','','','','','']
    

    let turn = 'X';
    //Update Tiles
    const updateTiles = function() {
        gameTiles.forEach(tile => {
            tile.innerHTML = gameTilesArray[tile.dataset.tile];
        })
    }

    //On Tile Click
    const onTileClick = function(tile) {
        if (!tile.innerHTML && !gameOver){
            gameTilesArray[tile.dataset.tile] = turn;
            if (turn === 'X')
                turn = 'O';
            else
                turn = 'X';
            update();
        }
    }

    gameTiles.forEach(tile => {
        tile.addEventListener('click', () => onTileClick(tile));
    })

    //Check for win
    const checkWin = function(combinationArray){
        if (gameTilesArray[combinationArray[0]] === gameTilesArray[combinationArray[1]] && gameTilesArray[combinationArray[1]] === gameTilesArray[combinationArray[2]] && gameTilesArray[combinationArray[0]]){
            gameOver = true;
            winner = gameTilesArray[combinationArray[0]];
        }
    }

    //Reset
    const reset = function(){
        gameTilesArray = ['','','','','','','','',''];
        turn = 'X';
        gameOver = false;
        winner = '';
        gameStatus.textContent = '';
        update();
    }

    return {updateTiles, checkWin, reset};
})();

function update() {
    gameBoard.updateTiles();
    
    const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    winningCombos.forEach(combo => {
        gameBoard.checkWin(combo);
    })

    if (gameOver){
        gameStatus.textContent = winner + ' is the winner!';
    }
}

resetButton.addEventListener('click', () => gameBoard.reset())