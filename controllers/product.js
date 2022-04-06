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

router.post('/addProduct/:categoryId',isAuth,async(request,response)=>{
    const accountId = request.account._id;
    const store = await Store.findOne({associateId:accountId});
    const categoryId = request.params.categoryId;
    const productId = mongoose.Types.ObjectId();
    const{  productName, imageSource, price,unitInStock,desclimer,isAgelimitid} = request.body;
    const _product = new Product({
        _id:productId,
        storeId:store._id,
        categoryId:categoryId,
        productName:productName,
        productImages:[
            {imageSource:imageSource}
        ],
        price:price,
        unitInStock:unitInStock,
        desclimer:desclimer,
        isAgelimitid:isAgelimitid

    });
    return _product.save()
    .then(product_updated =>{
        return response.status(200).json({
            productdata:product_updated
        });
    })
    .catch(err =>{
        return response.status(500).json({
            message:err
        });
    })
})

router.put('/updateProduct/:productId',isAuth,async(request,response)=>{
    const{  productName, imageSource, price,unitInStock,desclimer,isAgelimitid,discount} = request.body;
    const pid = request.params.productId;
    Product.findById(pid)
    .then(product=>{
        if(product){
            if(imageSource != ''){
            product.productImages.push({ imageSource:imageSource});
            }
            product.productName = productName,
           product.price = price,
           product.unitInStock = unitInStock,
           product.desclimer = desclimer,
           product.isAgelimitid = isAgelimitid,
           product.discount = discount
           return product.save()
           .then(product_updated =>{
            return response.status(200).json({
                productdata:product_updated
            });
        })

        }
        else{
            return response.status(200).json({
                status:false,
                message:'product not found!'
            })
        }
    })
    .catch(error =>{
        return response.status(500).json({
            message:error
        });
    })
})

router.delete('/deleteProduct/:productId',isAuth,async(request,response)=>{
    const pid = request.params.productId;
    Product.findByIdAndDelete(Pid)
    .then(product_delete =>{
        return response.status(200).json({
            status:true,
            message:product_delete
        })
    })
    .catch(err=>{
        return response.status(500).json({
            status:false,
            message:err
        });
    })  
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
router.get('/getProduct/:productId',isAuth,async(request,response)=>{
    const accountId = request.account._id;
    const pid = request.params.productId;
   Product.findById(pid)
    .then(products => {
        return response.status(200).json({
            status:true,
            message:products
        });
    })
    .catch(err =>{
        return response.status(500).json({
            status:false,
            message:err
        });
    })
});

module.exports = router;