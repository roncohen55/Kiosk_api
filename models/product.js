const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  productSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref:'category'} ,
    productName:String,
   productImages: [
       {
           imageSource:String
       }
   ],
   price:Number,
   desclimer:String,
   discount:{type:Number,default:0},
   unitInStock:Number,
   isAgelimitid:Boolean
});

module.exports = mongoose.model('product',productSchema);