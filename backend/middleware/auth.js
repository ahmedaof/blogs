const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
 const token = req.header('x-auth-token');
 //not verified
 if(!token) return res.status(401).json({msg: ' no token , this user not authorized'});
// if verified
try{
    const decode = jwt.verify(token,'mysecret');
    req.user = decode.user;
    next();
}
catch(err){
 return res.status(401).json({msg: ' invalid token , this user not authorized'});

}
}