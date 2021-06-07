var mongoose = require('mongoose');

var registerUserSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:""
    }
});

module.exports = mongoose.model('Users',registerUserSchema);