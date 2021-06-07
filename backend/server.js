var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();
var url = "mongodb+srv://ayoub:azerty123456@cluster0.eowgw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var app = express();
mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(() => console.log("db is working"))
.catch((err) => console.log(err))
//links
var varikostop = require('./routes/Varikostop');
var RegistredUser = require('./routes/auth/register')
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('',varikostop);
app.use('',RegistredUser)

var port = process.env.PORT || 8000;

app.listen(port,() => {
    console.log("app is running on " + port)
})