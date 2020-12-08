import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

function CountDownClock({countDown, ...props}) {
    return (
        <div className="countdown" {...props}>
            {countDown}
        </div>
    )
}

function RunClock(props) {
    const [runclock, setRunclock] = useState({sec: 0, milisec: 0})

    useEffect(() => {
        const interval = setInterval(() => {
            let sec, milisec
            if(runclock.milisec === 9) {
                sec = runclock.sec + 1
                milisec = 0
            } else {
                sec = runclock.sec
                milisec = runclock.milisec + 1
            }

            setRunclock({sec, milisec})
        }, 100)

        return () => {
            clearInterval(interval)
        }
    })

    return (
        <div className="runclock" {...props}>
            {runclock.sec}:{runclock.milisec}
        </div>
    )
}

function Clock(props) {

    /**Move the css primary color varible to root, so I will have access to him*/

    const [countDown, setCountDown] = useState()
    
    const countFunc = () => setTimeout(() => {
        setCountDown(countDown - 1)
    }, 1000)

    useEffect(() => {
        setCountDown(props.level.secMemorize)
        clearTimeout(countFunc)
    }, [props.gameNumber, props.level])

    useEffect(() => {
        let countAction
        if(countDown > 0) {
            countAction = setTimeout(() => {
                setCountDown(countDown - 1)
            }, 1000)
        }

        return () => {
            clearTimeout(countAction)
        }
    }, [countDown, props.level])

    if (props.gameNumber < props.level.numGames) {
        return countDown> 0 ? (
            <>
                <CountDownClock countDown={countDown} className={"countdown " + props.theme.cssClassName}/>
            </>
        ) : <><RunClock className={"runclock " + props.theme.cssClassName}/> </>
    } else return null
}

function mapStateToProps(state) {
    return {
        level: state.userOptions.level,
        gameNumber: state.userOptions.gameNumber,
        theme: state.userOptions.colorTheme
    }
}

export default connect(mapStateToProps)(Clock)