var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    phone:{
        type:String
    },
    name:{
        type:String

    },
    addresse:{
        type:String

    },
    city:{
        type:String
    }
});

module.exports = mongoose.model('users',UserSchema);