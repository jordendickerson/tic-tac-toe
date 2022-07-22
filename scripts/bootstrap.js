let gameOver = false;
let winner = '';

const gameStatus = document.querySelector('.game-status');
const resetButton = document.querySelector('.reset');

//Player
const player = (playerToken) => {
    let name = 'player';
    const token = playerToken;


    const changeName = (playerName) => {
        name = playerName;
    }

    return {changeName, name, token};
}

//Game Board
const gameBoard = (() => {
    const gameTiles = document.querySelectorAll('.game-tile');
    let gameTilesArray = ['','','','','','','','',''];

    const xPlayerNameInput = document.querySelector('#x-player-name');
    const oPlayerNameInput = document.querySelector('#o-player-name');
    const nameSubmitButton = document.querySelector('#submit-names');

    const xPlayer = player('X');
    const oPlayer = player('O');

    const changePlayerNames = function(){
        if (xPlayerNameInput.value && oPlayerNameInput.value){
            xPlayer.name = xPlayerNameInput.value;
            oPlayer.name = oPlayerNameInput.value;
            console.log(xPlayer.name);
            console.log(oPlayer.name);

        }else(
            alert('Please enter both names')
        )
    }

    nameSubmitButton.addEventListener('click', () => changePlayerNames());

    let turn = xPlayer;
    //Update Tiles
    const updateTiles = function() {
        gameTiles.forEach(tile => {
            tile.innerHTML = gameTilesArray[tile.dataset.tile];
        })
    }

    //On Tile Click
    const onTileClick = function(tile) {
        if (!tile.innerHTML && !gameOver){
            gameTilesArray[tile.dataset.tile] = turn.token;
            changeTurn();
            update();
        }
    }

    const changeTurn = function(){
        if (turn === xPlayer)
            turn = oPlayer;
        else
            turn = xPlayer;
    }

    gameTiles.forEach(tile => {
        tile.addEventListener('click', () => onTileClick(tile));
    })

    //Check for win
    const checkWin = function(combinationArray){
        if (gameTilesArray[combinationArray[0]] === gameTilesArray[combinationArray[1]] && gameTilesArray[combinationArray[1]] === gameTilesArray[combinationArray[2]] && gameTilesArray[combinationArray[0]]){
            gameOver = true;
            changeTurn();
            winner = turn.name;
        }
    }

    const checkDraw = function(){
        let usedTiles = 0;
        gameTilesArray.forEach(tile => {
            if (tile === 'X' || tile === 'O')
                usedTiles += 1;
        })
        if (usedTiles === 9 && winner === '')
            gameOver = true;
            usedTiles = 0;
    }

    //Reset
    const reset = function(){
        gameTilesArray = ['','','','','','','','',''];
        turn = xPlayer;
        gameOver = false;
        winner = '';
        gameStatus.textContent = '';
        update();
    }

    return {updateTiles, checkWin, checkDraw, reset};
})();



function update() {
    gameBoard.updateTiles();
    
    const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    winningCombos.forEach(combo => {
        gameBoard.checkWin(combo);
    })
    gameBoard.checkDraw();

    if (gameOver){
        if (winner){
            gameStatus.textContent = winner + ' is the winner!';
        }else{
            gameStatus.textContent = "It's a draw!";
        }
        
    }
}

resetButton.addEventListener('click', () => gameBoard.reset())