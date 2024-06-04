const gameBoard = document.getElementById('game');
let tiles = [];
let matchedTiles = [];
let totalTiles = 0;

function createTiles(numberOfTiles) {
    for (let i = 1; i <= numberOfTiles / 2; i++) {
        for (let j = 0; j < 2; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.setAttribute('data-id', i);
            tile.innerText = i;
            tile.addEventListener('click', flipTile);
            tiles.push(tile);
        }
    }
    totalTiles = numberOfTiles;
}

function shuffleTiles() {
    tiles.sort(() => Math.random() - 0.5);
}

function renderTiles() {
    gameBoard.innerHTML = '';
    tiles.forEach(tile => {
        gameBoard.appendChild(tile);
    });
}

function flipTile(event) {
    let clickedTile = event.target.closest('.tile');
    if (clickedTile && !clickedTile.classList.contains('flipped') && matchedTiles.length < 2) {
        clickedTile.classList.add('flipped');
        matchedTiles.push(clickedTile);
        if (matchedTiles.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    if (matchedTiles[0].dataset.id === matchedTiles[1].dataset.id) {
        matchedTiles.forEach(tile => {
            tile.removeEventListener('click', flipTile);
            tile.classList.add('matched');
        });
    } else {
        matchedTiles.forEach(tile => {
            tile.classList.remove('flipped');
        });
    }
    matchedTiles = [];

    if (document.querySelectorAll('.tile:not(.matched)').length === 0) {
        showModal('Поздравляем!', 'Вы победили!');
    }
}
function showModal(title, message) {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <button onclick="hideModal()">Закрыть</button>
        </div>`;
    document.body.appendChild(modal);
}

function hideModal() {
    document.querySelector('.modal').remove();
}
function startGame() {
    gameBoard.innerHTML = '';
    tiles = [];
    matchedTiles = [];
    totalTiles = 0;

    let numberOfTiles = prompt('Укажите количество карточек (чётное число):');
    if (numberOfTiles % 2 === 0) {
        createTiles(numberOfTiles);
        shuffleTiles();
        renderTiles();
    } else {
        alert('Количество карточек должно быть чётным числом.');
    }
}