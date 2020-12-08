import React from 'react'
import {connect} from 'react-redux'

import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader"

function WelcomeScreen(props) {

    return (
        <div className={`main-page ${props.theme}`}>
            <h2 className={`heading-medium`}>
                Welcome to the memory game
            </h2>
            <div className="main-page__context">
                <p className="main-page__par">
                    The rules are very simple. <br/>
                    You just flip each time two cards. <br/>
                    If you are corrent, they will stay flipped, <br />
                    if you are wrong they will flip back
                </p>
                <p className="main-page__par">
                    Each level has different time to memorize all the card, <br />
                    and each level has different amout of cards. <br />
                    In the end you will get weighted result of your game. <br />
                </p>
                <p className="main-page__par">
                    GOOD LUCK!
                </p>
            </div>
            <div className="main-page__bottom">
                <a onClick={props.onGameStart} className="button button--medium">Start</a>
            </div>
        </div>
    )
}

function mapStateToProp(state) {
    return {
        theme: state.userOptions.colorTheme.cssClassName
    }
}

export default connect(mapStateToProp)(WelcomeScreen)