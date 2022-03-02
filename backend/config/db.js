const mongoose = require('mongoose');

const dbConnect  = mongoose.connect('mongodb://localhost/blogs',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>console.log("connected"))

module.exports = dbConnect ;