const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const isAuth = require('./isAuth');
const Store = require('../models/store');
const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');



router.post('/addCategory',isAuth,async(request,response)=>{
    const accountId = request.account._id;
    const store = await Store.findOne({associateId:accountId});
    const categoryId = mongoose.Types.ObjectId();
    const{  categoryName, categoryImage, priority} = request.body;
    const _category = new Category({
        _id:categoryId,
        storeId:store._id,
        categoryName:categoryName,
        categoryImage:categoryImage,
        priarity:priority
    });
    return _category.save()
    .then(category_updated =>{
        return response.status(200).json({
            categorydata:category_updated
        });
    })
    .catch(error =>{
        return response.status(500).json({
            message:error
        });
    })
})

router.put('/updateCategory',isAuth,async(request,response)=>{
    
})

router.delete('/deleteCategory',isAuth,async(request,response)=>{
    
})

router.post('/addProduct',isAuth,async(request,response)=>{

})

router.put('/updateProduct',isAuth,async(request,response)=>{
    
})

router.delete('/deleteProduct',isAuth,async(request,response)=>{
    
})

router.get('/getProductByCategoryId/:categoryId',isAuth,async(request,response)=>{
    const accountId = request.account._id;
    const categoryId = request.params.categoryId;
    const store = await Store.findOne({associateId:accountId});
    Product.find({storeId:store._id,categoryId:category})
    .then(product =>{
        return response.status(200).json({
            status:true,
            message:product
        })
    })
    .catch(error =>{
        return response.status(500).json({
            status:false,
            message:error
        });
    })
})

module.exports = router;