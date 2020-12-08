import axios from 'axios'
import Icon from '../third-party/svg-lib.svg'

async function extractSvgId() {
    await axios.get(Icon).then((res) => {
        const parser = new DOMParser()
        const svgArr = []
        let symbolElms = parser.parseFromString(res.data, "text/xml").getElementsByTagName("symbol")
        svgArr.forEach.call(symbolElms, (elm) => {
            svgArr.push(elm.id)
        })
        localStorage.setItem("svgArr", svgArr)
        console.log(svgArr)
    })
}

export async function svgGen(level) {

    if(!localStorage.getItem("svgArr")) {
        await extractSvgId()
    }

    let svgArr =  localStorage.getItem("svgArr").split(',')
    let counter = svgArr.length,
        svgGameArr = []
    
    while(svgGameArr.length < level.numCards / 2) {
        let randIndex = Math.floor(Math.random() * counter)
        svgGameArr.push(svgArr[randIndex])
        svgArr[randIndex] = svgArr[svgArr.length - svgGameArr.length]
        counter--
    }

    return svgGameArr
}

export async function mixCards(level) {

    const svgArr = await svgGen(level)
    const gameSvgArr = [...svgArr, ...svgArr]
    gameSvgArr.forEach((elm,index) => {
        const rnd = Math.floor(Math.random()*gameSvgArr.length)
        gameSvgArr[index] = gameSvgArr[rnd]
        gameSvgArr[rnd] = elm
    })
    return gameSvgArr
}
