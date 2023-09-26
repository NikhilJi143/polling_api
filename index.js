require('dotenv').config();

const Port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const db = require('./config/mongoose');

// Routes
app.use('/',require('./routes/index'));
   
app.listen(Port, function(err){
    if(err){
        console.log(err);
    }
    console.log("server is runing on port ::",Port);
})