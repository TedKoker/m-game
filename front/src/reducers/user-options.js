import {LEVEL, COLOR_THEME, GAME_NUMBER} from "../actions/types"

export default function (state={}, action) {
    switch(action.type) {
        case LEVEL:
            return {...state , level: action.payload, time: Date.now()}
        case COLOR_THEME:
            return {...state, colorTheme: action.payload}
        case GAME_NUMBER:
            return {...state, gameNumber: action.payload}
        default:
            return state
    }
}