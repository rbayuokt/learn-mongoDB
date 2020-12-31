const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true
    }
});

const User = mongoose.model('Bayu',userSchema);
module.exports = User;