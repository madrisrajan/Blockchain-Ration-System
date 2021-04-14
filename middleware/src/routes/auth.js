const express = require('express');
const sha256 = require('sha256');
const User = require('../models/user');
const router = new express.Router();

router.post('api/auth/login', (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const username = req.body.username;
    const passhash = sha256(req.body.password);
    const group = req.body.group;

    try{
        User.findOne({username}, (err, doc) => {
        if(err || doc == null) return res.sendStatus(404);
        if (doc.passhash === passhash) {

            // let userdata = {
            //     username,
            //     passhash,
            //     group,
            // };

            res.status(200).send({
                message : 'Login Successful',
            });
        }else{
            res.status(401).send({
                message : 'Login failed',
            });
        }
        });
    
   } catch (error) {
    console.log(error)
    res.status(500).send({
        message : 'Server error',
    });
}
});

router.post('api/auth/register', async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const username = req.body.username;
    const passhash = sha256(req.body.password);
    const group = req.body.group;


                try{
                    let newUser = {
                        username,
                        passhash,
                        group,
                    };
                  
                    // Create Wallet Identity for the Username
                 const regUser = require(`../../fabric/reg_user/${newUser.group}user`);
                 await regUser(newUser);


                 // Add username & passhash to the MongoDB Auth Database
                 User.create(newUser, (err, doc) => {
                     console.log(err);
                     res.status(200).send({
                         message : 'Registered successfully'
                     });
                 });

            
                } catch (error) {
                    console.log(error)
                    res.status(500).send({
                        message : 'Server failed',
                    });
             

                }
        
  
});

      

module.exports = router;

