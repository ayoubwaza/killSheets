const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
var registerUserSchema = require('../../models/registerUser')

router.post('/api/register',(req,res) => {
    var userName = "zaezedzedze";
    var password = "dzedzed";
    var role = "azeaze";
    registerUserSchema.findOne({userName})
    .then((user) => {
        if(user){
            return res.status(404).json('user laready exist..please try again')
        }
        var newUser = new registerUserSchema({
            userName,
            password,
            role
        })
        bcrypt.genSalt(10,(err,salt) => {
            if(err) throw err
            bcrypt.hash(newUser.password,salt,(err,hash) => {
                if(err) throw err
                newUser.password = hash;
                newUser.save()
                .then((data) => res.json(data))
            })
        })
    })
})

module.exports = router;