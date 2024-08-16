document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const intro = document.getElementById('intro');
    const container = document.querySelector('.container');
    const timerElement = document.querySelector('.timer')
    const imgs = ['./images/TNT.jpg', './images/bomb.jpeg']; // Array of images
    let currentIndex = 0;

    function changeBackgroundImage() {
        currentIndex = (currentIndex + 1) % imgs.length; // Cycle through the images
        container.style.backgroundImage = `url(${imgs[currentIndex]})`;
    }

    // Change image every 30 seconds (30000 milliseconds)
    setInterval(changeBackgroundImage, 30000);

    startButton.addEventListener('click', () => {
        intro.style.display = 'none'; // Hide instructions and button
        initGame(); // Initialize the game
    });

    function initGame() {
        // Your game initialization code here
        const rows = 8;
        const cols = 8;
        const mineCount = 15; // Adjust the number of mines here
        const cells = [];
        let gameOver = false;

        const table = document.querySelector('table');
        
        function startTimer() {
            timer = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const secs = seconds % 60;
                timerElement.textContent = `${minutes}:${secs < 10 ? '0' : ''}${secs} min`;
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerInterval);
        }

        function initGame() {
            table.innerHTML = '';
            cells.length = 0;
            gameOver = false;
            seconds = 0;
            startTimer();

            // Create board
            for (let r = 0; r < rows; r++) {
                const tr = document.createElement('tr');
                cells[r] = [];
                for (let c = 0; c < cols; c++) {
                    const td = document.createElement('td');
                    td.classList.add('cellCR');
                    td.dataset.row = r;
                    td.dataset.col = c;
                    td.addEventListener('click', handleClick);
                    tr.appendChild(td);
                    cells[r][c] = { isMine: false, isRevealed: false };
                }
                table.appendChild(tr);
            }

            // Place mines
            let placedMines = 0;
            while (placedMines < mineCount) {
                const row = Math.floor(Math.random() * rows);
                const col = Math.floor(Math.random() * cols);
                if (!cells[row][col].isMine) {
                    cells[row][col].isMine = true;
                    placedMines++;
                }
            }
        }

        function handleClick(event) {
            if (gameOver) return;

            const cell = event.target;
            const row = cell.dataset.row;
            const col = cell.dataset.col;

            if (cells[row][col].isRevealed) return;
            cells[row][col].isRevealed = true;

            if (cells[row][col].isMine) {
                cell.classList.add('mine');
                cell.textContent = '💣';
                gameOver = true;
                stopTimer();
                alert('Game Over! You hit a mine.');
                return;
            }

            cell.classList.add('revealed');
            cell.textContent = ''; // Empty cell for now

            // Reveal surrounding cells if the current cell is empty
            revealEmptyCells(row, col);
        }

        function revealEmptyCells(row, col) {
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],         [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];

            directions.forEach(([dRow, dCol]) => {
                const newRow = parseInt(row) + dRow;
                const newCol = parseInt(col) + dCol;

                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    const cell = document.querySelector(`td[data-row="${newRow}"][data-col="${newCol}"]`);
                    if (!cells[newRow][newCol].isRevealed && !cells[newRow][newCol].isMine) {
                        cells[newRow][newCol].isRevealed = true;
                        cell.classList.add('revealed');
                        cell.textContent = ''; // Empty cell for now
                        revealEmptyCells(newRow, newCol);
                    }
                }
            });
        }

        // Initialize the game
        initGame();
    }
});
