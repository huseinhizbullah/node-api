'use strict'

//Module
const express = require('express') //express server
const bodyParser = require('body-parser') //handling req / res

const routes = require('./routers/route'); //importing route

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app); //register the route


//Handling 404 Not Found
app.use(function (req, res) {
    res.status(404).send({ message: req.originalUrl + ' not found' })
})


//Booting the App
app.listen(port)
console.log('User Management API Started on Port : ' + port)