import React, {useState} from 'react'

import Nav from "./components/navigation/nav"
import GameBoard from "./components/game-board/game-board"
import Clock from './components/game-board/clocks'
import WelcomeScreen from './components/welcome-screen'
import WinScreen from './components/game-board/win-screen'

import "./sass/main.scss"

export default function() {

    const startGame = () => {
        setRender([<div className="game-field" key={0}><GameBoard /> <Clock /></div>]) 
    }

    const [renderd, setRender] = useState([<WelcomeScreen key={0} onGameStart={startGame}/>])

    return (
        <>
            <Nav />
            {renderd.map(elm => elm)}
            {/* <div className="game-board"><WinScreen score={99}/></div> */}
        </>
    )
}