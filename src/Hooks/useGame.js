import { useEffect, useReducer } from "react";
import { createBoard, handleMove } from "../Utils/gameLogic";

const initialState = {
    board: createBoard,
    score: 0,
    highScore: 0,
    status: "playing"
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