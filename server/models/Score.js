const express = require("express")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const standartReq = {
    type: String,
    required: true,
    lowercase: true
}

const scoreSchema = new Schema({
    firstName: {
        ...standartReq
    },

    lastName: {
        ...standartReq
    },

    score: {
        type: Number,
        required: true
    }
})

/**
 * Organaize by score when saving
 */

const ScoreClass = mongoose.model('score', scoreSchema)
module.exports = ScoreClass