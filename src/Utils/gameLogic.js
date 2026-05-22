import { BOARD_SIZE } from "../Constants/constants"

export function createBoard() {
    const arr = Array(0).fill(null).map(() => Array(0).fill(null))
    spawnTile(arr)
    spawnTile(arr)
    return arr
}

export function spawnTile(board) {
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