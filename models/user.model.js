const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: false
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String
    },
    followers: [
        {
            uid: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            profilePicture:{
                type: String
            }
        }
    ],
    following: [
        {
            uid: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            profilePicture:{
                type: String
            }
        }
    ],
    uid: {
        type: String,
        required: true,
        unique: true
    },
    category_pref:{
        type: Array
    }
});

module.exports = mongoose.model('People', schema);
