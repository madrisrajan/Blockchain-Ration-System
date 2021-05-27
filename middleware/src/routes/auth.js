const express = require('express');
const sha256 = require('sha256');
const User = require('../models/user');
const citizenregister = require('../models/citizenreg')
const router = new express.Router();

router.post('/api/auth/login', (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const username = req.body.username;
    const passhash = sha256(req.body.password);
    const group = req.body.group;

    

    if(group === 'citizens'){

        try{
            citizenregister.findOne({username},(err,doc) => {

                if(err || doc == null) return res.sendStatus(404);
                if(doc.passhash === passhash && doc.isregistered == '0'){

                    res.status(200).send({
                        message: 'login successful',
                        loginsuc: "1",
                        
                    });

                }else if(doc.passhash === passhash &&  doc.isregistered == '1'){

                    res.status(200).send({
                        message: 'login successful',
                        loginsuc: "2",
                    });

                }else{
                    res.status(401).send({
                        message: 'login failed!!',
                        loginsuc: "0",
                    });
                }

            });
        } catch (error) {
             console.log(error)
             res.status(500).send({
             message : 'Server error',
     });
}

    }else{

            try{
        User.findOne({username}, (err, doc) => {
        if(err || doc == null) return res.sendStatus(404);
        if (doc.passhash === passhash) {
console.log(group)
            // let userdata = {
            //     username,
            //     passhash,
            //     group,
            // };

            res.status(200).send({
                usergrp: doc.group,
                loginsuc: '2',
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

    }


});

router.post('/api/auth/signup', async (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const username = req.body.username;
    const passhash = sha256(req.body.password);
    const group = req.body.group;
    const isregistered = "0";

    if(group === 'citizens'){

        let newCitizen = {
            username,
            passhash,
            group,
            isregistered,
        };
        try{

                // Create Wallet Identity for the Username
                 const regUser = require(`../../fabric/reg_user/citizensuser`);
                 await regUser(newCitizen);

                 // Add username & passhash to the MongoDB Auth Database
                 citizenregister.create(newCitizen, (err, doc) => {
                     console.log(err);
                     res.status(200).send({
                         message : 'Registered successfully'
                     });
                 });
        }

         catch (error) {
                    console.log(error)
                    res.status(500).send({
                        message : 'Server failed',
                    });
             

                }    



    }else{
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

    }


               
        
  
});

      

module.exports = router;

