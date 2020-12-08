import React, {useEffect, useState} from 'react'

function CardFront({xlinkHref, ...props}) {

    return (
        <div className="card__front" {...props}>
            <svg>
                <use xlinkHref={xlinkHref} />
            </svg>
        </div>
    )
}

function CardBack(props) {

    return (
        <div className="card__back" {...props}>
                
        </div>
    )
}

export default React.forwardRef(({xlinkHref, ...props}, ref) => {

    const [fixedStyle, setFixedStyle] = useState()

    useEffect(() => {
        setFixedStyle({transition: 'none'})

        const timeout = setTimeout(() => {
            setFixedStyle(null)
        })

        return () => {
            clearTimeout(timeout)
        }
    }, [ref, xlinkHref])

    return (
        <div {...props} ref={ref}>
            <input type="checkbox" defaultChecked={true}/>
            <label>
                <CardFront xlinkHref={xlinkHref} style={fixedStyle}/>
                <CardBack  style={fixedStyle}/>
            </label>
        </div>
    )
})
