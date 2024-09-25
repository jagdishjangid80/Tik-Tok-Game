document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameActive = true;
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (cell.textContent !== '' || !gameActive) {
            return;
        }

        cell.textContent = currentPlayer;
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const valueA = cells[a].textContent;
            const valueB = cells[b].textContent;
            const valueC = cells[c].textContent;

            if (valueA === '' || valueB === '' || valueC === '') {
                continue;
            }
            if (valueA === valueB && valueB === valueC) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(winningMessage());
            gameActive = false;
            return;
        }

        const draw = [...cells].every(cell => cell.textContent !== '');
        if (draw) {
            alert(drawMessage());
            gameActive = false;
            return;
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        gameActive = true;
        cells.forEach(cell => cell.textContent = '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
