import {GAME_SCORE} from '../actions/types'

export default function score(state = {}, action) {
    switch(action.type) {
        case GAME_SCORE:
            return {...state, scoreTable: action.payload}
        default:
            return state
    }
}