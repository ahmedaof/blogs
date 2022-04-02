const express = require('express');
const dbConnect = require('./config/db');

const app = express();
app.use(express.json({extends:false}));

dbConnect();

app.use('/api/users' , require('./router/user'))
app.use('/api/auth' , require('./router/auth'))
app.use('/api/profile' , require('./router/profile'))
app.use('/api/post' , require('./router/post'))
let port = process.env.PORT || 5000 ;

app.listen( port , () =>{

    console.log(`the app works in port ${port}`)
})