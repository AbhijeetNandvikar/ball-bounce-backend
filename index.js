const express = require('express')
var cors = require('cors')

const cordinates = require('./bounce.js')
const app = express();
app.use(cors())


const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    cordinates(Number(req.query.h), Number(req.query.e)).then(resp => {
        res.send(JSON.stringify(resp))
    })
    // console.log(JSON.stringify(hCordinates))
    // console.log(hCordinates)

})

app.listen(PORT, console.log(`listening on port ${PORT}`))