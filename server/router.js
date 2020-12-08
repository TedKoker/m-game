const scoreController = require("./controllers/scoreDb")

module.exports = app => {
    app.post("/score", scoreController.post)
    app.get("/score", scoreController.get)
}