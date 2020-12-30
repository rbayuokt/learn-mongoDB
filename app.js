const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const moongose = require('mongoose');
const bodyParser = require('body-parser');

//import model
const Blog = require('./models/blog');

const PORT = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json())

const dbURI = "change this with own";

moongose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT);
        console.log("database connected");
    }).catch((err) => {
        console.log(err)
    });


//for add new document to a collection
app.post('/send', (req, res) => {
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

//get all data from a collection
app.get('/all', (req, res) => {
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


//get specific document from a collection
app.get('/get/:id', (req, res) => {
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
app.get('/delete/:id', (req, res) => {
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

