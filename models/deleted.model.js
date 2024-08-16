const mongoose = require('mongoose');
const schema = mongoose.Schema({
    post:{
        type:Object
    },
    metaData:{
        type:Object
    },
    upid:{
        type: String
    },
    category:{
        type: String
    }
},{Timestamp:true});
const model = mongoose.model('Deleted-dev',schema);
module.exports = model;