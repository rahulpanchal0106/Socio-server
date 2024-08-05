const mongoose = require('mongoose');
const schema = mongoose.Schema({
    postId:{
        type:String
    },
    userId:{
        type: String
    },
    category:{
        type:String
    }

},{Timestamp:true});
const model = mongoose.model('Liked Posts',schema);
module.exports=model;