const baseUrl="https://m-game-back.herokuapp.com"
const scoreController="score"

export const dbConfig = {
    baseUrl: baseUrl,
    scoreController: {
        get: `${baseUrl}/${scoreController}`,
        post: `${baseUrl}/${scoreController}`
    }
}