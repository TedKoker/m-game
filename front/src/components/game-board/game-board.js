import React, {useEffect, useReducer, useRef, useState} from 'react'
import {connect} from 'react-redux'

import * as action from "../../actions"
import {mixCards} from "../../game-engine"
import Icon from "../../third-party/svg-lib.svg"
import Card from "./card-components"
import WinScreen from "./win-screen"
import WinTable from './win-table'

function GameBoard(props) {

    const [cardsArr, setCardArray] = useState([])
    const [currentClicked, setCurrentClicked] = useState()
    const [winScreen, setWinScreen] = useState(null)

    const gameboardDiv = useRef([])

    const reducer = (state, action) => {
        const objFunc = (count,flippedCard, mistakes, timeOuts) => {
            return {count,flippedCard,mistakes, timeOuts}
        }
        switch(action.type) {
            case 'increacment':
                return objFunc(state.count + 1,  action.payload, state.mistakes, state.timeOuts)
            case 'decreacment': 
                return objFunc(state.count - 1,  undefined, state.mistakes + 1, state.timeOuts)
            case 'reset':
                return objFunc(0, undefined, 0, [])
            default:
                objFunc(state.count, undefined, state.mistakes, state.timeOuts)
        }
    }

    const [helpers, dispatchHelper] = useReducer(reducer, { flippedCard: undefined, count: 0, mistakes: 0, timeOuts: []})

    useEffect(() => {
        setWinScreen(<WinTable/>)
    }, [props.showTable])

    const checkboxHackHelper = (elms = [], check, callback) => {
        elms.forEach((elm) => {
            if(elm && elm.getElementsByTagName("input")[0].checked!== check) {
                elm.getElementsByTagName("input")[0].checked = check
                if(callback) {
                    callback()
                }
            }
        })
    }

    const timeoutCreater = (time,callback, ...props) => {
        const returnedTimeout = setTimeout(() => {
            callback.apply(this, props)
        }, time)
        return returnedTimeout
    }

    const radioCheckHandler = (e) => {
        checkboxHackHelper([e.currentTarget], true, ()=>{setCurrentClicked(e.currentTarget)})
    }

    const startGame = () => {
        mixCards(props.level).then(arr => {
            gameboardDiv.current = []
            const tempArr = []
            arr.forEach((card, index) => {
                gameboardDiv.current.push(React.createRef())
                tempArr.push(<Card key={index+"-"+card} 
                            ref={gameboardDiv.current[index]}
                            xlinkHref={Icon +"#" + card}
                            onClick={radioCheckHandler}
                            className={"card " + props.level.cssClassName + " " + props.colorTheme.cssClassName}/>)
            })
            setCardArray(tempArr)
        })
    }

    useEffect(() => {
        setWinScreen(null)
        checkboxHackHelper(gameboardDiv.current.map(item =>  item.current), true)
        if(gameboardDiv.current.length) {
            const timeout = timeoutCreater(props.level.secMemorize * 1000,  checkboxHackHelper, gameboardDiv.current.map(item => item.current), false)
            helpers.timeOuts.push(timeout)
        }
    }, [cardsArr])


    useEffect(() => {
        if(helpers.count === props.level.numCards * props.level.numGames) {
            props.setGameNumber(helpers.count / props.level.numCards)
            const time = (Date.now() - props.time - props.level.secMemorize * props.level.numGames) / 1000
            const score = 100 - helpers.mistakes * 3 + props.level.secGame * props.level.numGames - time
            setWinScreen(<><WinScreen score={Math.round(score)}/></>)
        }
        else if(helpers.count > 0 && helpers.count % props.level.numCards === 0) { 
            helpers.timeOuts.push(timeoutCreater(1200, startGame))
        }
    }, [helpers])


    useEffect(() => {
        if(!currentClicked) {
            return
        }
        if(!helpers.flippedCard) {
            dispatchHelper({type: 'increacment', payload: currentClicked})
        } else {
            const flippedIcon = helpers.flippedCard.getElementsByTagName("use")[0].getAttribute("xlink:href")
            const currentIcon = currentClicked.getElementsByTagName("use")[0].getAttribute("xlink:href")
            if(currentIcon !== flippedIcon) {
                const currentTmp = currentClicked
                dispatchHelper({type: 'decreacment'})
                helpers.timeOuts.push(timeoutCreater(1200, checkboxHackHelper, [currentTmp, helpers.flippedCard], false))
            } else {
                dispatchHelper({type: 'increacment', payload: undefined})
            }
        }
        setCurrentClicked(undefined)
    },[currentClicked])

    useEffect(() => {
        props.setGameNumber(0)
        dispatchHelper({type: 'reset'})
        startGame()
        return () => {
            helpers.timeOuts.forEach(item => {clearTimeout(item)})
        }
    },[props.level])


    useEffect(() => {
        if(gameboardDiv.current.length) {
            gameboardDiv.current.forEach(div => {
                div.current.className = "card " + props.level.cssClassName + " " + props.colorTheme.cssClassName
            })
        }
    }, [props.colorTheme])

    return (
        <div className={"game-board " + (currentClicked && helpers.flippedCard ? "disable-clicks" : "")}>
            {cardsArr.map(item => item)}
            {winScreen}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        colorTheme: state.userOptions.colorTheme,
        level: state.userOptions.level,
        time: state.userOptions.time,
        theme: state.userOptions.colorTheme,
        showTable: state.form["submit-score"] && state.form["submit-score"].submitSucceeded ? true : false
    }
}

export default connect(mapStateToProps,action)(GameBoard)