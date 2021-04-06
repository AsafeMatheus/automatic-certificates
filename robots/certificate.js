const pdf = require('html-pdf')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const sendEmail = require('./email')

function createPDF(collection){
    //let html = fs.readFileSync('./robots/views/person.ejs', 'utf8')
    let options = { 
        height: "4.7in",
        width: "9in"
    }

    let filePath = './robots/views/person.ejs'

    collection.find((err, listOfPeople) => {
        if (err){
            console.log('ok')
        } else{
            listOfPeople.forEach((person) => {
                let personId = person._id
                let personEmail = person.email

                ejs.renderFile(filePath, {person}, (err, data) => {
                    if (err){
                        console.log('erro')
                    }

                    pdf.create(data, options).toFile('./' + person._id + '.pdf', function(err, res) {
                        if (err) return console.log(err);
                    })
                })

                sendEmail('./' + person._id + '.pdf', personEmail)

                collection.deleteOne({_id:personId}, (err) => {
                    if (err){
                        console.log(err)
                    } else{
                        console.log('just success!')
                    }
                })
            })
        }
    })
}

module.exports = createPDF