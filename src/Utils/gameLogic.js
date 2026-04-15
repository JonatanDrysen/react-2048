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