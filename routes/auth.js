require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = awaitUser.find({});
        res.status(200).json({users});
    } catch(e) {
        res.status(500).json({error: "Server error"});
    };

});

//post - user registers 
router.post('/signup', async (req, res) => {
    const {username, password} = req.body; 
    try {
        const user = await User.findOne({username})
        if(user) {
            return res.status(400).json({error: 'user already exists'}); 
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username, 
            password: hashedPwd
        }); 
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'}); 
    } catch(e) {
        res.status(500).json({error: 'Server error'}); 
    }
});

router.post('/login', async(req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user) return res.status(404).json({error: 'User not found'}); 

        const isValid = await bcrypt.compare(password, user.password); 
        if(!isValid) return res.status(401).json({error: 'Incorrect Password'}); 

        //creates a JWT with the user's id, the token is sent back the client 
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET); 
        res.status(200).json({message: 'User succesfully logged in: ', token});
    } catch(e) {
        res.status(500).json({error: 'Login Failed'});
    };
});

module.exports = router