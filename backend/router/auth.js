const bcrypt = require('bcryptjs/dist/bcrypt');
const express  = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const handleRes = require('../errors/error');
const signInRequest = require('../request/authRequest');
const jwt = require('jsonwebtoken');


router.get('/me',auth,async (req,res)=>{
    try{
        let user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('server error');
    }
});


router.post('/signin', signInRequest() ,async (req,res,next)=> {
    handleRes(req,res,next);
    const {name , email , password} = req.body
    try {
    let user = await User.findOne({email}) ;

    if(!user){
        return res.status(400).json({errors:{msg:'the email u enterd is not exist'}});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({errors:{msg:'the password u enterd is not exist'}});

    }
    
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



module.exports = router ;