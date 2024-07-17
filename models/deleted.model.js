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
    }
},{Timestamp:true});
const model = mongoose.model('Deleted',schema);
module.exports = model;