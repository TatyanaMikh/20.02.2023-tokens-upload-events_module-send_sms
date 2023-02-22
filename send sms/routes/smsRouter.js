const express = require('express');
const axios = require('axios');



const router =express.Router();


router.get('/send',async(req,res)=>{

    const data_to_send = {
        messages: [
            {
                body:"test",
                to: '+972503882224',
                from:'sss'
            }
        ]
    };

    const config = {
        headers : {
            'Content-Type':'application/json'
        },
        auth : {
            username:"david33333",
            password:"45CA848F-9C6D-C82F-B0C7-6C57B122AE76"
        }
    }

    try {

        const response = await axios.post('https://rest.clicksend.com/v3/sms/send', data_to_send, config);

        const status = await response.status;

        const data = await response.data;

        return res.status(200).json({
            status,
            data
        })


        
    } catch (error) {
        return res.status(500).json({
            message:"error in sendind sms"
        })
    }


})


module.exports = router;