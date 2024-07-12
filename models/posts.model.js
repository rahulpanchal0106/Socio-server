const mongoose = require('mongoose');
const schema = mongoose.Schema({
    post:{
        type:Object
    },
    metaData:{
        type:Object
    }
},{
    timestamps: true
});
const model = mongoose.model('Posts',schema);
module.exports = model;