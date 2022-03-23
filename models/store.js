const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  storeSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    associateId: {type: mongoose.Schema.Types.ObjectId, ref:'User'} ,
    storeName:String,
    storeDescription:String,
    isTakeway:Boolean,
    isDelivery:Boolean,
    subs:[
        {
        associateId: {type: mongoose.Schema.Types.ObjectId, ref:'User'} ,
        }
    ],
    contactInfo:
    {
         email: String,
        mobile: String
        ,phone:String
        
        ,city:String
        ,address:String
        ,latitude:String
        ,longtitude:String},
        reviews:[
          {
              accountId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
              reviewContext:String,
              createdAt: {type:Date,default:Date.now},
              rank:Number,
              isPublished:Boolean
          }
    ],
    workingHours:[
        {day:Number,fromHour:String,loHour:String,isOpen:Boolean}
    ],
    logo: {type:String,default:'https://cdn.vox-cdn.com/thumbor/00awoM5IS2kFITs9546UyMSePBY=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/69715362/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png'},
    createdAt: {type:Date,default:Date.now},
   updatedAt: {type:Date,default:Date.now},
    isLocked: {type:Boolean,default:false}
});

module.exports = mongoose.model('store',storeSchema);