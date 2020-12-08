const Score = require("../models/Score")

exports.post = (req, res, next) => {
    const {firstName, lastName, score} = req.body

    const scoreVar = new Score({firstName, lastName, score})

    scoreVar.save(err => {
        if(err) {
            return next(err)
        }
        res.json(scoreVar)
    })
}

exports.get = async (req, res, next) => {
    try {
        let scores = await Score.find().sort([['score', -1]])
        return res.send(scores.slice(0, 20))
    } catch(err) {
        return next(err)
    }
}