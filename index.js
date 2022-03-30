const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const accountsRoute = require('./controllers/accounts');
app.use('/api/accounts',accountsRoute);

const storeRoute = require('./controllers/store');
app.use('/api/store',storeRoute);

const productRoute = require('./controllers/product');
app.use('/api/product',productRoute);

const port = 5090;

const url = 'mongodb+srv://kiosk_user:123@cluster0.ormat.mongodb.net/kiosk_db?retryWrites=true&w=majority';

mongoose.connect(url)
.then(results =>{
    console.log(results);
    app.listen(port,function(){
        console.log(`server is running in port: ${port}`);
    })
})
.catch(err =>{
    console.log(err);
})