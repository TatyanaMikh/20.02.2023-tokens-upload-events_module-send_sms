const express = require('express');

const nodemailer = require('nodemailer');

const app = express();



const magic = () => {

    return new Promise((resolve, reject) => {


        const transporter = nodemailer.createTransport({
            service: '',
            auth: {
                user: '',
                pass: ''
            }
        });

        const mail = {
            //from: '',
            to: '',
            subject: '',
            text: ''
        };

        transporter.sendMail(mail, (err, data) => {

            if (err) {
                return reject({
                    message: "error in send mail function"
                })
            }

            return resolve({
                message:"email was successfully sent"
            })
        })


    })

}



app.get('/send_email', async (req, res) => {


    try {

        const response = await magic();
        const message = await response.message;

        return res.status(200).json({
            message
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }



});


app.listen(3000, () => {
    console.log('server run in port 3000');
})
