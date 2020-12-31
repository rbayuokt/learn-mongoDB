const express = require('express');
const router = express.Router();
const User = require('../models/user');

//add new user to users collection
router.post('/', (req, res) => {
    const { username, password, name, sex, age } = req.body;

    const user = new User({
        username: username,
        password: password,
        name: name,
        sex: sex,
        age: age
    });

    user.save()
        .then((data) => {
            res.status(200).json({
                status: 200,
                message: "user was successfully added !",
                data
            })
        }).catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to create new user !",
                error
            })
        })
});

//get all user data from a users collection
router.get('/', (req, res) => {
    User.find()
        .then((data) => {
            res.status(200).json({
                status: 200,
                message: "user data was successfully loaded !",
                data
            })
        }).catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to load data !",
                error
            })
        })
});

//get specific user document from a users collection
router.get('/:id', (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then((data) => {
            res.status(200).json({
                status: 200,
                message: "user data was successfully loaded !",
                data
            })
        }).catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to get user data !",
                error
            })
        })
})

//delete a document from a users collection
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then((data) => {
            res.status(200).json({
                status: 200,
                message: 'deleted successfully !',
                data
            })
        }).catch((error) => {
            res.status(500).send({
                status: 500,
                message: "id not found !",
                error
            })
        })
})


module.exports = router;