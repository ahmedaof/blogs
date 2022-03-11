const { check } = require('express-validator');

 
const signInRequest = () => [
     check('password').notEmpty(),
      check('email').isEmail()
]

module.exports = signInRequest;