
const gameBoard = (() => {
    const gameTiles = document.querySelectorAll('.game-tile');
    let gameTilesArray = ['X','O','X','O','X','O','O','X','X']
    

    let index = 0
    const changeTiles = function() {
        gameTiles.forEach(tile => {
            tile.innerHTML = gameTilesArray[tile.dataset.tile];
        })
    }

    return {changeTiles};
})();

gameBoard.changeTiles();