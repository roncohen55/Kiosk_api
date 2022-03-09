
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcryptjs = require('bcryptjs'); 

//model
const User = require('../models/user');

router.post('/createAccount', async (request,response) =>{
    //1-get user inputs
   const {firstName ,lastName ,email ,password ,mobile } = request.body;
    //2-check if user exsist
    User.findOne({ email: email  })
    .then(async account => {

        if(account){
            return response.status(200).json({
                message: 'User is already exsist ,please try other email'
            });
        }
        else{
            //3-crypt password
             const formatted_password = await bcryptjs.hash(password,10);
            //4-generate paasscode
             const passcode = generateRandomIntegerInRange(1000,9999);
             //5-create user in mongodb
             const _user = new User ({
                _id:mongoose.Types.ObjectId(),
                email:email,
                password:formatted_password,
                mobile:mobile,
                firstName:firstName,
                lastName:lastName,
                passcode:passcode
            })
            _user.save()
            .then(account_created =>{
                return response.status(200).json({
                    message:account_created
                });
            })

        }

    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
   

   
    
    //6-response
});
function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


router.get('/sayHello',async (request,response)=>{
    try {
        const users = await User.find();
        return response.status(200).json({
            message:users
        });
    } catch (error) {
        return response.status(500).json({
            message:error
        });
    }
    return response.status(200).json({
        message:' Hello from kiosk api'
    });
})






module.exports = router;