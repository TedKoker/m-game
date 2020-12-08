
import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import userOptions from './user-options'
import game from './game'

export default combineReducers({
    userOptions,
    game,
    form: formReducer
})