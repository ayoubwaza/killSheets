var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();
var UserSchema = require('./models/users');
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
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


var port = process.env.PORT || 7000;
app.post('/addUser',(req,res) => {
    var phone = req.body.phone;
    UserSchema.findOne({phone:phone})
    .then((user) => {
        if(user){
            return res.status(404).json('already exist')
        }
        var newUser = new UserSchema({
            phone
        })
        newUser.save()
        .then(() => console.log("saved..."))
    })
    .catch((err) => console.log(err))
});
app.get('/all',(req,res) => {
    UserSchema.find()
    .then((data) => {
        res.status(202).json(data)
    })
})
app.listen(port,() => {
    console.log("app is running on " + port)
})