const express = require('express')
const cookieParser = require('cookie-parser')
const quiz = require('./routes/quiz')

const app = express()
const port = process.env.port || 3000

app.listen(port, 'localhost', () => {
   console.log(`Server is listening at http://localhost:${port} ...`)
})

app.use(express.static('./public'))
app.use(cookieParser())

quiz(app) 