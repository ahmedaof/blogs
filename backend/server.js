const express = require('express');
const dbConnect = require('./config/db');

const app = express();

dbConnect();

let port = process.env.PORT || 5000 ;

app.listen( port , () =>{

    console.log(`the app works in port ${port}`)
})