const mongoose = require('mongoose');
const schema = mongoose.Schema({
    post:{
        type:Object
    },
    metaData:{
        type:Object
    }
});
const model = mongoose.model('Deleted',schema);
module.exports = model;