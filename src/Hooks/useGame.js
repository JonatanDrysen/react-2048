import { useEffect, useReducer } from "react";
import { createBoard, moveBoard, spawnTile, checkWin, checkLoss } from "../Utils/gameLogic";
import { BOARD_SIZE } from "../Constants/constants";

const initialState = {
    board: createBoard,
    score: 0,
    highScore: 0,
    status: "playing"
}

function calculateScore(newBoard, oldBoard) {
    let delta = 0
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (newBoard[row][col] > oldBoard[row][col]) {
                delta += newBoard[row][col]
            }
        }
    }
    return delta
}

export function handleMove(state, direction) {
    if (state.status !== "playing") return state
    
    const newBoard = moveBoard(state.board, direction)
    const didBoardChange = JSON.stringify(newBoard) !== JSON.stringify(state.board)
    if (!didBoardChange) return state

    const newScore = state.score + calculateScore(newBoard, state.board)

    spawnTile(newBoard)
    
    if (checkWin(newBoard)) return {...state, board: newBoard, score: newScore, best: Math.max(newScore, state.best), status: "won"}
    if (checkLoss(newBoard)) return {...state, board: newBoard, score: newScore, best: Math.max(newScore, state.best), status: "lost"}

    return {
        ...state,
        board: newBoard,
        score: newScore,
        best: Math.max(newScore, state.best)
    }
}

function reducer (state, action) {
    switch (action.type) {
        case "MOVE":
            return handleMove(state, action.direction)
        case "RESTART": 
            return {...initialState, board: createBoard(), highScore: state.highScore}
        default: 
            return state
    }
}

export function useGame() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        function handleKeyDown(e) {
            const directionMap = {
                ArrowUp: 'up',
                ArrowDown: 'down',
                ArrowLeft: 'left',
                ArrowRight: 'right'
            }
            const direction = directionMap[e.key]
            if (direction) dispatch({type: "MOVE", direction})
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return {
        board: state.board,
        score: state.score,
        best: state.best,
        status: state.status,
        restart: () => dispatch({ type: 'RESTART' })
    }
}