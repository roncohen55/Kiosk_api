
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/sayHello',(request,response)=>{
    return response.status(200).json({
        message:' Hello from kiosk api'
    });
})



module.exports = router;