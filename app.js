const express = require('express');
const moongose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
const PORT = 8080;

//router
const blogRoute = require('./routes/blogs');
const userRoute = require('./routes/users');

const app = express();

app.use(cors());
app.use(bodyParser.json())

//use the router
app.use('/blogs', blogRoute)
app.use('/users', userRoute)

moongose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT);
        console.log("database connected");
    }).catch((err) => {
        console.log(err)
    });
