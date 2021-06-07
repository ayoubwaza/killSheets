var express = require('express');
var router = express.Router();
var UserSchema = require('../models/Vari');

router.get('/all/varikostop',(req,res) => {
    UserSchema.find({})
    .then((data) => {
        res.status(202).json(data)
    })
});
router.post('/addUser',(req,res) => {
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
router.delete('/delete/user/:id',(req,res) => {
    UserSchema.findByIdAndRemove(req.params.id)
    .then(() => res.status(202).json('user has been deleted successfully...'))
    .catch((err) => console.log(err))
})
router.put('/update/user/:id',(req,res) => {
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
});

module.exports = router;