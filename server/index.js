const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")
const http = require("http")
const mongoose = require("mongoose")
const morgan = require("morgan")
const MongoClient = require("mongodb").MongoClient

const dbConfig = require("./dbConfig").connectArgs
const router = require("./router")

const app = express()


const uri = process.env.DB_CONNECTION || dbConfig.dbAdress

if(process.env.DB_CONNECTION) {
    const client = new MongoClient(uri, {useNewUrlParser:true})
    client.connect(err => {
        console.log(err)
        client.close()
    })
}

console.log(uri)

mongoose.connect(uri, dbConfig.options).then(() => {
    console.log("connected to", uri)
}).catch((err) => {
    console.log('***********Error occurred************')
    console.log(err)
})

app.use(morgan("combined"))
app.use( cors({
    origin:"*" //Add the firebase domain origins
}) )
app.use(bodyParser.json({type: "*/*"}))
router(app)


const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log(`server listening on port ${port}`)