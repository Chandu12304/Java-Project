const express = require('express')
const colors = require('colors')//for giving color to console texts
const morgan = require('morgan')//for getting information about the type of routes,endpoints etc..(it is a middleware)
const dotenv = require('dotenv')//dotenv module to store all the confidential info
const mysqlPool = require('./config/db')

//configure dotenv
dotenv.config()

//rest object
const app = express();

//middlewares
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use("/api/v1/student", require("./routes/studentRoutes"))

app.get('/test', (req, res) => {
    res.status(200).send('<h1>Nodejs Mysql App</h1>')
})

//port
const port = process.env.port || 8000

//conditionally listen
mysqlPool.query('SELECT 1').then(() => {
    //MY SQL
    console.log('mys database has connected'.bgCyan.white)
    //listen
    app.listen(port, () => {
        console.log(`server is running on port ${port}`.bgMagenta.white)
    })
}).catch((err)=>{
    console.log(err)
})

