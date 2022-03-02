const mongoose = require('mongoose');

const dbConnect  = async() => {
    try{
   await mongoose.connect('mongodb://localhost/blogs',{
        useNewUrlParser:true,
    })
    console.log("connected to Database")

}catch(err){
console.log(err);
//exit with failer
process.exit(1);
}}

module.exports = dbConnect ;