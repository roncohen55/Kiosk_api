const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (request,response,next)=>{

    const beararHeader = request.headers['authorization'];
    if(beararHeader){

        const bearer = beararHeader.split(' ');
        const bearerToken = bearer[1];
       

        jwt.verify(bearerToken, 'SCd0NO7ysWJlS4Wzcf5ZOS2I3lp7rcv0',(err,authData)=>{
            if(err){
                return response.sendStatus(403);
            }
            else{
               // console.log(authData);
               User.findById(authData._id)
               .then(account => {
                   console.log(account);
                request.token = bearerToken;
                request.account = account;
                next();
               })
               .catch(err =>{
                   return response.sendStatus(403);
               })
            }
        });
    }
    else{
        return response.sendStatus(403);
    }
    

}
