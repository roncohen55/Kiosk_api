const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const isAuth = require('./isAuth');
const Store = require('../models/store');
const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');
const { request, response } = require('express');



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

router.put('/updateCategory/:categoryId',isAuth,async(request,response)=>{
    const{  categoryName, categoryImage, priority} = request.body;
    const cid = request.params.categoryId;
    Category.findById(cid)
    .then(category=>{
        if(category){
            category.categoryName=categoryName,
            category.categoryImage=categoryImage,
           category.priarity=priority
           return category.save()
           .then(category_updated =>{
            return response.status(200).json({
                categorydata:category_updated
            });
        })

        }
        else{
            return response.status(200).json({
                status:false,
                message:'Category not found!'
            })
        }
    })
    .catch(error =>{
        return response.status(500).json({
            message:error
        });
    })
  
});


router.delete('/deleteCategory/:categoryId',isAuth,async(request,response)=>{
    const cid = request.params.categoryId;
    Category.findByIdAndDelete(cid)
    .then(category_delete =>{
        return response.status(200).json({
            status:true,
            message:category_delete
        })
    })
    .catch(err=>{
        return response.status(500).json({
            status:false,
            message:err
        });
    })
})

router.get('/getCategoy/:categoryId',isAuth,async(request,response)=>{
    const accountId = request.account._id;
    const cid = request.params.categoryId;
    Category.findById(cid)
    .then(categories => {
        return response.status(200).json({
            status:true,
            message:categories
        });
    })
    .catch(err =>{
        return response.status(500).json({
            status:false,
            message:err
        });
    })
});

router.get('/getAllCategories',isAuth,async(request,response)=>{
    const accountId = request.account._id;
    const store = await Store.findOne({associateId:accountId});
    Category.find({storeId:store._id})
    .then(categories => {
        return response.status(200).json({
            status:true,
            message:categories
        });
    })
    .catch(err =>{
        return response.status(500).json({
            status:false,
            message:err
        });
    })
});

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