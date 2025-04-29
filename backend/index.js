const express = require('express')
const cors = require('cors')
const UserRouter = require('./router/UserRouter')
const app = express()
const path = require('path');

app.use(cors({credentials: true , origin: 'http://localhost:5173'}))
app.use(express.json())


app.use('/users', UserRouter)


app.listen(5000)