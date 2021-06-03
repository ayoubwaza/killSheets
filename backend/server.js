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


var port = process.env.PORT || 8000;
app.post('/addUser',(req,res) => {
    var phone = req.body.phone;
    var name = req.body.name;
    var city = req.body.city;
    var addresse = req.body.addresse;
    UserSchema.findOne({phone:phone})
    .then((user) => {
        if(user){
            return res.status(404).json('already exist')
        }
        var newUser = new UserSchema({
            phone,
            name,
            city,
            addresse
        })
        newUser.save()
        .then(() => console.log("saved..."))
    })
    .catch((err) => console.log(err))
});
app.delete('/delete/user/:id',(req,res) => {
    UserSchema.findByIdAndRemove(req.params.id)
    .then(() => res.status(202).json('user has been deleted successfully...'))
    .catch((err) => console.log(err))
})
app.get('/all',(req,res) => {
    UserSchema.find()
    .then((data) => {
        res.status(202).json(data)
    })
});
app.put('/update/user/:id',(req,res) => {
    UserSchema.findByIdAndUpdate(req.params.id)
    .then((data) => {
        data.name =  req.body.name;
        data.city =  req.body.city;
        data.addresse =  req.body.addresse;
        data.phone =  req.body.phone;
        data.save((err,success) => {
            if(err) throw err
            return res.status(202).json('data has been updated successfully')
        })
    })
})
app.listen(port,() => {
    console.log("app is running on " + port)
})