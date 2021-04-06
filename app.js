const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const createCertificate = require('./robots/certificate')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/certificateDB', {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
    email: String,
    name: String
})

const Person = mongoose.model('person', personSchema)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    const personForming = req.body

    let newPerson = new Person({
        email: personForming.email,
        name: personForming.name
    })
    
    newPerson.save()

    res.sendFile(__dirname + '/success.html')
})

setInterval(() => {
    createCertificate(Person)
}, 3000)

app.listen(3000, () => {
    console.log('server is running on port 3000.')
})