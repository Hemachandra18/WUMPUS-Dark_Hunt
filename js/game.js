document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart");
    const attemptsDisplay = document.getElementById("attempts");
    const gridSize = 4;
    const trapCount = 3;
    const totalTiles = gridSize * gridSize;

    let gameState = [];
    let treasurePosition;
    let playerPosition;
    let beastPosition;
    let steps = 0;
    let attempts = 0;
    let gameOver = false;
    let beastSpawned = false;

    function createGoldFall() {
        const goldContainer = document.getElementById("falling-gold");
        const gold = document.createElement("span");
        gold.textContent = "🏆";
        gold.classList.add("falling-gold");
        gold.style.left = `${Math.random() * window.innerWidth}px`;
        goldContainer.appendChild(gold);

        setTimeout(() => gold.remove(), 2000);
    }

    function shakeEarth() {
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 1000);
    }

    function createBreeze() {
        const breeze = document.createElement("span");
        breeze.classList.add("breeze");
        breeze.textContent = "🍃";
        breeze.style.left = `${Math.random() * 100}%`;
        document.body.appendChild(breeze);
        breeze.classList.add("animate-breeze");

        setTimeout(() => breeze.remove(), 3000);
    }

    function createTrap() {
        const trap = document.createElement("span");
        trap.textContent = "🌪";
        trap.classList.add("animate-trap");
        document.body.appendChild(trap);

        setTimeout(() => trap.remove(), 3000);
    }

    function createGoldSmell() {
        const goldSmell = document.createElement("span");
        goldSmell.textContent = "🪙";
        goldSmell.classList.add("animate-gold-smell");
        document.body.appendChild(goldSmell);

        setTimeout(() => goldSmell.remove(), 3000);
    }

    function initGame() {
        grid.innerHTML = "";
        message.textContent = "";
        attempts = 0;
        steps = 0;
        gameOver = false;
        beastSpawned = false;
        playerPosition = gridSize * (gridSize - 1);
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        gameState = Array(totalTiles).fill("safe");

        const forbidden = [playerPosition];

        for (let i = 0; i < trapCount; i++) {
            let pos;
            do {
                pos = Math.floor(Math.random() * totalTiles);
            } while (gameState[pos] !== "safe" || forbidden.includes(pos));
            gameState[pos] = "trap";
        }

        do {
            treasurePosition = Math.floor(Math.random() * totalTiles);
        } while (gameState[treasurePosition] !== "safe");
        gameState[treasurePosition] = "treasure";

        for (let i = 0; i < totalTiles; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.index = i;
            if (i === playerPosition) tile.classList.add("revealed");
            grid.appendChild(tile);
        }

        grid.addEventListener("click", handleTileClick);
    }

    function spawnBeast() {
        if (beastSpawned) return;

        let pos;
        do {
            pos = Math.floor(Math.random() * totalTiles);
        } while (gameState[pos] !== "safe" || pos === playerPosition || pos === treasurePosition);

        beastPosition = pos;
        gameState[pos] = "beast";
        shakeEarth();
        message.textContent = "The beast has spawned on a random block!";
        beastSpawned = true;
    }

    function handleTileClick(e) {
        if (gameOver) return;

        const tile = e.target;
        if (!tile.classList.contains("tile") || tile.classList.contains("revealed")) return;

        const index = Number(tile.dataset.index);
        if (!isMoveValid(index)) {
            message.textContent = "Invalid move! You cannot move diagonally";
            return;
        }

        playerPosition = index;
        steps++;
        attempts++;
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        tile.classList.add("revealed");

        if (steps === 5) spawnBeast();

        if (gameState[index] === "trap") {
            tile.classList.add("trap");
            message.textContent = "Game Over! Trap!";
            createTrap();
            endGame();
        } else if (gameState[index] === "treasure") {
            tile.classList.add("treasure");
            message.textContent = "You found the treasure!";
            createGoldFall();
            endGame();
        } else if (gameState[index] === "beast") {
            message.textContent = "The beast ate you!";
            endGame();
        } else {
            tile.textContent = getHint(index);
        }
    }

    function isMoveValid(index) {
        const r1 = Math.floor(index / gridSize);
        const c1 = index % gridSize;
        const r2 = Math.floor(playerPosition / gridSize);
        const c2 = playerPosition % gridSize;
        return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
    }

    function getHint(index) {
        const adj = [index - 1, index + 1, index - gridSize, index + gridSize]
            .filter(i => i >= 0 && i < totalTiles);

        if (adj.some(i => gameState[i] === "beast")) {
            return "You hear a growl nearby...";
        }
        if (adj.some(i => gameState[i] === "trap")) {
            createBreeze();
            return "You feel a breeze...";
        }
        if (adj.includes(treasurePosition)) {
            createGoldSmell();
            return "You smell gold!";
        }
        return "Safe.";
    }

    function endGame() {
        gameOver = true;
    }

    document.getElementById("restart").addEventListener("click", initGame);
    initGame();
});
