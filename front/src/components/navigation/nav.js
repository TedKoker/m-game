import React from 'react'
import {connect} from 'react-redux'

import lvlArr from "../../game-engine/lvl-obj"
import themeArr from "../../game-engine/theme-obj"
import * as actions from "../../actions"
import Icon from './nav-icons/symbol-defs.svg'

function GameOption({optionName, choiceArr, svgLink, ...props}) {
    /**In the end, add active class */
    return (
        <>
        <input type="checkbox" className="nav__checkbox" id={optionName}/>
        <label className="nav__option" htmlFor={optionName} {...props}>
            <div className="nav__choice-name">
                <svg>
                    <use xlinkHref={svgLink}></use>
                </svg>
                <span>{optionName}</span>
            </div>
            <div className="nav__choice-menu">
                <ul>
                    {choiceArr.map((choice, index) => {
                        return <li key={index} data-key={index} 
                                className={choice===optionName ? "nav__choice-menu--active" : ""}>{choice}</li>
                    })}
                </ul>
            </div>
        </label>
        </>
    )
}

const clickHandler = (e, callback, obj) => {
    if(e.target.getAttribute('data-key')) {
        callback(obj[e.target.getAttribute('data-key')])
    }
}

function Nav(props) {

    return (
        <nav className="nav">
            <h2 className="nav__heading">
                M-Game
            </h2>
            <div className="nav__options">
                <GameOption 
                    optionName={props.level}
                    choiceArr={lvlArr.map(item => item.name)}
                    svgLink={Icon+"#icon-display"}
                    onClick={(e)=>{
                        clickHandler(e, props.setLevel, lvlArr)
                        // props.setLevel(lvlArr[e.target.getAttribute('data-key')])
                    }}
                />
                <GameOption 
                    optionName={props.colorTheme}
                    choiceArr={themeArr.map(item => item.themeName)}
                    svgLink={Icon+"#icon-pen"}
                    onClick={(e) => {
                        clickHandler(e, props.setColorTheme, themeArr)
                        // props.setColorTheme(themeArr[e.target.getAttribute('data-key')])
                    }}
                />
            </div>
        </nav>
    )
}

function mapStateToProps(state) {
    return {
        colorTheme: state.userOptions.colorTheme.themeName,
        level: state.userOptions.level.name
    }
}

export default connect(mapStateToProps, actions)(Nav)