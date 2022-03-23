const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  categorySchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    storeId: {type: mongoose.Schema.Types.ObjectId, ref:'store'} ,
    categoryName:String,
   categoryImage: {type:String,default:'https://cdn.vox-cdn.com/thumbor/00awoM5IS2kFITs9546UyMSePBY=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/69715362/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png'},
   priarity:Number


});

module.exports = mongoose.model('category',categorySchema);