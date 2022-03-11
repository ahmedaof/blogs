const { check } = require('express-validator');

 
const userRequest = () => [
    check('name',"name must be entered").notEmpty(),
     check('password').notEmpty(),
      check('email').isEmail()
]

module.exports = userRequest;