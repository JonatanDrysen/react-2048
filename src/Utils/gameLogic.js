import { BOARD_SIZE, WIN_TILE } from "../Constants/constants"

export function createBoard() {
    console.log("Called createBoard()")
    const arr = Array(4).fill(null).map(() => Array(4).fill(null))
    spawnTile(arr)
    spawnTile(arr)
    return arr
}

export function spawnTile(board) {
    console.log("Called spawnTile()")
    const emptyCells = []
    
    for (let row = 0; row < BOARD_SIZE; row++) {
        for ( let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === null) {
                emptyCells.push({row, col})
            }
        }
    }

    if (emptyCells.length === 0) return board

    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    board[row][col] = Math.random() < 0.9 ? 2 : 4

    return board
}

export function slideRow(row) {
    console.log("Called slideRow()")
    const tiles = row.filter(val => val !== null)
    
    const mergedTiles = []
    let i = 0

    while (i < tiles.length) {
        if (tiles[i] === tiles[i + 1]) {
            mergedTiles.push(tiles[i] * 2)
            i += 2
        } else {
            mergedTiles.push(tiles[i])
            i += 1
        }
    }

    while (mergedTiles.length < BOARD_SIZE) {
        mergedTiles.push(null)
    }

    return mergedTiles
}

function rotateBoardClockwise(board) {
    console.log("Called rotateBoardClockwise()")
    const boardSize = board.length
    const rotatedBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null))
    
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            rotatedBoard[col][boardSize - 1 - row] = board[row][col]
        }
    }

    return rotatedBoard
}

export function moveBoard(board, direction) {
    console.log("Called moveBoard()")
    let rotatedBoard = board

    if (direction === "up") rotatedBoard = rotateBoardClockwise(board)
    if (direction === "right") rotatedBoard = rotateBoardClockwise(rotateBoardClockwise(board))
    if (direction === "down") rotatedBoard = rotateBoardClockwise(rotateBoardClockwise(rotateBoardClockwise(board)))
    
    const movedBoard = rotatedBoard.map(row => slideRow(row))
    
    if (direction === "up") return rotateBoardClockwise(rotateBoardClockwise(rotateBoardClockwise(movedBoard)))
    if (direction === "right") return rotateBoardClockwise(rotateBoardClockwise(movedBoard))
    if (direction === "down") return rotateBoardClockwise(movedBoard)

    return movedBoard
}

export function checkWin(board) {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === WIN_TILE) return true
        }
    }
    return false
}

export function checkLoss(board) {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === null) return false
            if (row + 1 < BOARD_SIZE && board[row + 1][col] === board[row][col]) return false
            if (col + 1 < BOARD_SIZE && board[row][col] === board[row][col + 1]) return false
        }
    }
    return true
}
