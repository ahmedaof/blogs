const express = require('express');
const handleRes = require('../errors/error');
const userRequest = require('../request/UserRequest');
const User = require('../models/User');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const route = express.Router();

route.post('/signup', userRequest() ,async (req,res,next)=> {
    handleRes(req,res,next);
    const {name , email , password} = req.body
    try {
    let user = await User.findOne({email}) ;

    if(user){
        return res.status(400).json({errors:{msg:'this user already registerd'}});
    }

    const avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    });

    user = new User({
        name,
        email,
        avatar,
        password
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);

    await user.save();
    
    const payload = {
        user: {

            id:user.id
        }
    }

    jwt.sign(payload ,"mysecret",{expiresIn:36000},(err,token)=>{
     if(err) throw err ;
     res.json({ token })
    })

    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }

});


module.exports = route ;