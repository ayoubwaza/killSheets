var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    phone:{
        type:String
    }
});

module.exports = mongoose.model('users',UserSchema);