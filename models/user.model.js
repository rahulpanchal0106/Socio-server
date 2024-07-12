const mongoose=require('mongoose');

const schema = mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique: true
    },
    password:{
        type:String
    },
    uid:{
        type:String
    }
})

module.exports = mongoose.model('user',schema);