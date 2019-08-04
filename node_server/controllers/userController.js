const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

var { User }  = require('../models/user');

// => localhost:3000/users
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err){ res.send(docs)}
        else { console.log('Error retriving users: ' + JSON.stringify(err, undefinedm, 2))}
    });
});
// => localhost:3000/users
router.post('/', (req, res) => {
    var user = new User({
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone
    });
    user.save((err, doc) => {
        if(!err){res.send(doc)}
        else{console.log('Error saving user: ' + JSON.stringify(err, undefined, 2))}
    })
});
// => localhost:3000/users/id
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record found for id:  ${req.params.id}`);
    }

    User.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            console.log(JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if(ObjectId.isValid(req.params)) {
        return res.status(400).send(`No data found for given id: ${req.params.id}`);
    }

     var user = {
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone
    };

    User.findByIdAndUpdate(req.params.id, {$set: user}, {new: true}, (err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            console.log(JSON.stringify(err))
        }
    })



});

router.delete('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)) { return res.status(400).send(`No records found for id: ${req.params.id}`)}

    User.findByIdAndDelete(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            console.log(JSON.stringify(err))
        }
    })
});
module.exports = router;