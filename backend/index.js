const express = require('express')
const cors = require('cors')
const UserRouter = require('./router/UserRouter')
const ReportRouter = require('./router/ReportRouter')
const SuggestionRouter = require('./router/SuggestionRouter')
const app = express()
const path = require('path');

app.use(cors({credentials: true , origin: 'http://localhost:5173'}))

app.use(express.json());


app.use('/users', UserRouter)
app.use('/report', ReportRouter)
app.use('/Suggestion', SuggestionRouter)


app.listen(5000)