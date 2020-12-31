const express = require('express');
const router = express.Router();

//import model
const Blog = require('../models/blog');

router.use(function (req, res, next) {
    next()
})

//get all data from a collection
router.get('/', (req, res) => {
    Blog.find()
        .then((data) => {
            res.status(200).json({
                status: 200,
                message: "blog post data was successfully loaded !",
                data
            })
        }).catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to load data !",
                error
            })
        })
})

//for add new document to a collection
router.post('/', (req, res) => {
    const { title, author, body, tags } = req.body;

    const blog = new Blog({
        title: title,
        author: author,
        body: body,
        tags: tags
    })

    blog.save()
        .then((data) => {
            res.status(200).json({
                status: 200,
                message: "blog post was successfully added !",
                data
            })
        }).catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to create blog post !",
                error
            })
        })
});



//get specific document from a collection
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((data) => {
            res.status(200).json({
                status: 200,
                message: "blog post data was successfully loaded !",
                data
            })
        }).catch((error) => {
            res.status(500).json({
                status: 500,
                message: "failed to get blog post data !",
                error
            })
        })
})

//delete specific document from a collection
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndRemove(id)
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