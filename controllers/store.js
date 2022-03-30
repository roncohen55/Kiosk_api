const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const isAuth = require('./isAuth');
const Store = require('../models/store');
const User = require('../models/user');
const { request, response } = require('express');

router.post('/createStore',isAuth, async (request,response)=>{
    const   associateId = request.account._id;
   

    const isStoreExist = await Store.findOne({associateId:associateId});
    if(isStoreExist){
        return response.status(200).json({
            message:'you can only add one store per user'
        });
    }
    else{
        const storeId = mongoose.Types.ObjectId();
        const {
        storeName,
        storeDescription,
        isTakeway,
        isDelivery,
        email ,
        mobile ,
        phone,
        city,address,latitude,longtitude
        }= request.body;

        const account = await User.findById(associateId);
        account.isBusiness = true;
        return account.save()
        .then(account_updated => {
        const _store = new Store({
            _id:storeId,
            associateId:associateId,
            storeName:storeName,
            storeDescription:storeDescription,
            isTakeway:isTakeway,
            isDelivery:isDelivery,
            subs:[],
            contactInfo:{
            email:email ,
            mobile:mobile ,
            phone:phone,
            city:city
            ,address:address
            ,latitude:latitude
            ,longtitude:longtitude
        },
        reviews:[],
        workingHours:[]

        });
        return _store.save()
        .then(store_created => {
            return response.status(200).json({
                storeData:store_created,
                accountData:account_updated
            });
        })
        
        })
        .catch(error =>{
            return response.status(500).json({
                message:error
            });
        })
    }
})

router.put('/updateStore',isAuth,async(request,response)=>{
    const   associateId = request.account._id;
    const store = await Store.findOne({associateId:associateId});
    const {
    storeName,
    storeDescription,
    isTakeway,
    isDelivery,
    email ,
    mobile ,
    phone,
    city,address,latitude,longtitude,
    workingHours,logo
    }= request.body;
            store.storeName = storeName;
            store.storeDescription = storeDescription;
            store.isTakeway = isTakeway;
            store.isDelivery = isDelivery;

            store.contactInfo={
                email:email,
                mobile:mobile,
                phone:phone,
                city:city,
                address:address,
                latitude:latitude,
                longtitude:longtitude
            };
           
        store.workingHours=workingHours;
        store.logo=logo;
        return store.save()
        .then(store_updated=>{
            return response.status(200).json({
                storeData:store_updated
            });
        })
        .catch(error =>{
            return response.status(500).json({
                message:error
            });
        })
        
    })

module.exports = router;