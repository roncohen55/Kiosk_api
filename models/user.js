const express = require('express');
const mongoose = require('mongoose');
const router = require('../controllers/accounts');
const Schema = mongoose.Schema;

const  userSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email: String,
    createdAt: {type:Date,default:Date.now},
    password: String,
    mobile: String,
    dob:Date,
    avatar: {type:String,default:'https://cdn.vox-cdn.com/thumbor/00awoM5IS2kFITs9546UyMSePBY=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/69715362/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png'},
    firstName: String,
    lastName: String,
    passcode: Number,
    subs:[
        {
        storeId: {type: mongoose.Schema.Types.ObjectId, ref:'store'} ,
        }
    ],
    level:{type:String,default:'Newbie'},
    points:{type:Number,default:0},
    isBusiness: {type:Boolean,default:false},
    isApproved: {type:Boolean,default:false}, 
    isLocked: {type:Boolean,default:false}
});

module.exports = mongoose.model('User',userSchema);