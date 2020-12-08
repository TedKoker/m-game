import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MainScreen from "./MainScreen"

import lvlArr from "./game-engine/lvl-obj"
import themeArr from "./game-engine/theme-obj"
import reducers from "./reducers"
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'


const store = createStore(
    reducers,
    {
      userOptions: {colorTheme: themeArr[0], level: lvlArr[0], time:Date.now(), gameNumber: 0}
    },
    applyMiddleware(reduxThunk)
)

ReactDOM.render(
    <Provider store={store}> 
      <MainScreen />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
