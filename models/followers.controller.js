const mongoose=require('mongoose');

const schema = mongoose.Schema({
    
    usernameTo:{
        type:String,
        unique: true
    },
    uidTo:{
        type:String
    },
    usernameBy:{
        type:String,
        unique: true
    },
    uidBy:{
        type:String
    }
    

})

module.exports = mongoose.model('user-dev',schema);