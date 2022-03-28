
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcryptjs = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const isAuth = require('./isAuth');

//models
const User = require('../models/user');
const { request, response } = require('express');
const Store = require('../models/store');

//createAcount
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

//login
router.post('/login',async (request,response)=>{
    //get user credential
    const {email,password} = request.body;

    //is user exist ?
    User.findOne({email:email})
    .then(async account =>{
        if(account){
                 // is verified ? is locked ?
            if(account.isApproved && !account.isLocked){
                const isMatch = await bcryptjs.compare(password,account.password);
                  // compare password
                if(isMatch){
                    //create token
                    const acc_data = {
                        firstName:account.firstName,
                        lastName:account.lastName,
                        avatar:account.avatar,
                        mobile:account.mobile,
                        email:account.email,
                        _id:account._id
                    };

                    const token =await jwt.sign(acc_data, 'SCd0NO7ysWJlS4Wzcf5ZOS2I3lp7rcv0');
                    return response.status(200).json({
                        token: token
                    });
                    //response
                }
                else{
                    return response.status(200).json({
                        message:'your password is not match'
                    })
                }
            }
            else{
                return response.status(200).json({
                    message:'your account is not active'
                })
            }
        }
        else{
            return response.status(200).json({
                message: 'User not found'
             });
        }
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
   
  

  
    
});

//verify passcode
router.post('/verify', async  (request, response)=>{
    // TODO Get password and email
    const {email,passcode} = request.body;
    // TODO Is user exist ? 
    User.findOne({ email: email })
    .then (async account => {
        if (account){
            // TODO Verify code
            if (account.passcode == passcode){
                    // TODO Update isApproved
                account.isApproved= true;
                account.save()
                .then(account_updated =>{
                    // TODO Response
                    return response.status(200).json({
                        message: account_updated
                     });
                })
            }
            else{
                return response.status(200).json({
                    message: 'PassCode not match'
                 });
            }
        }
        else{
            return response.status(200).json({
                message: 'User not found'
             });
        }
    })
    .catch(err =>{
        return response.status(500).json({
            message: err
         });
    })

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

//forget password
router.post('/forgetPassword', async (request,response)=>{
    const email = request.body.email;
    User.findOne({ email: email })
    .then(async account => {
        if(account){
            const newpasscode = generateRandomIntegerInRange(1000,9999);
            account.passcode = newpasscode;
            account.save()
            .then(account_updated => {
                return response.status(200).json({
                    message:account_updated.passcode
                })
            })
        }
        else{
            return response.status(200).json({
                message: 'User not found'
             });
        }
    })
    .catch(err =>{
        return response.status(500).json({
            message: err
         });
    })
   

});

//verify Newpasscode
router.post('/verifyNew', async  (request, response)=>{
    // TODO Get password and email
    const {email,passcode} = request.body;
    // TODO Is user exist ? 
    User.findOne({ email: email })
    .then (async account => {
        if (account){
            // TODO Verify code
            if (account.passcode == passcode){                    
                    // TODO Response
                    return response.status(200).json({
                        message:'the passcode is match'
                     });
              
            }
            else{
                return response.status(200).json({
                    message: 'PassCode not match'
                 });
            }
        }
        else{
            return response.status(200).json({
                message: 'User not found'
             });
        }
    })
    .catch(err =>{
        return response.status(500).json({
            message: err
         });
    })

});

router.post('/newpassword',async (request,response)=>{
    const {email,password} = request.body;
    User.findOne({ email: email })
    .then(async (account)=>{
        if(account){
            const formatedPassword = await bcryptjs.hash(password,10);
            account.password = formatedPassword;
            account.save()
            .then(account_updated=>{
                return response.status(200).json({
                    message:account_updated
                })
            })


        }
        else{
            return response.status(200).json({
                message:'user not found'
            })
        }
    })
    .catch(err =>{
        return response.status(500).json({
            message: err
         });
    })
});

router.get('/getUserData',isAuth, async (request,response)=>{
    const id = request.account._id;
    const store = await Store.findOne({associateId:id}).populate('associateId');
    return response.status(200).json({
        message: `Hello ${request.account.firstName}`,
        data:store
    });
})




module.exports = router;