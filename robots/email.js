const nodemailer = require('nodemailer')

module.exports = function sendEmail(file, to){
    const user = 'email account'
    const pass = 'email password'

    var transporter = nodemailer.createTransport({
        host: "smtp.office365.com", 
        secureConnection: false,
        port: 587, 
        tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
        },
        auth: {
            user: user,
            pass: pass
        }
    })

    var mailOptions = {
        from: user, 
        to: to, 
        subject: 'certificate',
        html: '<h2>Certificate above</h2>',
        attachments: [{
            //filename: file,
            path: file 
        }]
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log(err)
        } 
    })
}