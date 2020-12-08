import axios from 'axios'

import {LEVEL, COLOR_THEME, GAME_NUMBER, GAME_SCORE} from "./types"
import {dbConfig} from '../dbConfig'

export const setLevel = (newLevel)  => {
    return {
        type: LEVEL,
        payload: newLevel
    }
}

export const setColorTheme = (color) => {
    return {
        type: COLOR_THEME,
        payload: color
    }
}

export const setGameNumber = (gameNumber) => {
    return {
        type: GAME_NUMBER,
        payload: gameNumber
    }
}

export const addScore = (scoreObj) =>async dispatch => {

    await axios.post(dbConfig.scoreController.post, scoreObj, {
        headers: {
            'Access-Control-Allow-Origin':'*'
        }
    })
    const scoreItem = await axios.get(dbConfig.scoreController.get, {headers: {
        'Access-Control-Allow-Origin':'*'
    }})
    dispatch({ type: GAME_SCORE, payload: scoreItem.data})
}