import DIRECTIONS from './direction.js';

let maze = [];
let currentX, currentY;
let direction = 2; // Start facing down
let interval;

export function initializeRightWallFollower(mazeData) {
    maze = mazeData;

    // Start position at bottom left
    currentX = 1;
    currentY = maze.length - 2;

    direction = 2; // Facing down
    drawCurrentPosition();

    // Start Right Wall Following
    interval = setInterval(moveRightWallFollower, 50);
}

function drawCurrentPosition() {

    const prevCell = document.querySelector(`#cell-${currentY}-${currentX}`);
    if (prevCell && !prevCell.classList.contains('visited')) {
            prevCell.classList.add('visited');
    }

    document.querySelectorAll('.cell.current').forEach(cell => {
        cell.classList.remove('current');
    });

    const cell = document.querySelector(`#cell-${currentY}-${currentX}`);
    if (cell) {
        cell.classList.add('current');
    }
}

function moveRightWallFollower() {
    if (currentX === maze[0].length - 2 && currentY === 1) {
        clearInterval(interval);
        console.log('Solved!');
        return;
    }

    // Try turning right first
    let rightDirection = (direction + 1) % 4;
    let rightX = currentX + DIRECTIONS[rightDirection].dx;
    let rightY = currentY + DIRECTIONS[rightDirection].dy;

    if (maze[rightY][rightX] === 0) {
        direction = rightDirection;
        currentX = rightX;
        currentY = rightY;
    } else {
        let forwardX = currentX + DIRECTIONS[direction].dx;
        let forwardY = currentY + DIRECTIONS[direction].dy;

        if (maze[forwardY][forwardX] === 0) {
            currentX = forwardX;
            currentY = forwardY;
        } else {
            // Turn left if both right and forward are blocked
            direction = (direction + 3) % 4;
        }
    }
    drawCurrentPosition();
}
