const mongoose = require('mongoose');
const schema = mongoose.Schema({
    post:{
        likes:{
            type:Number,
            default:0
        },
        content:{
            type:String,
        },
        likedBy:{
            type:Array
        }
    },
    metaData:{
        type:Object
    },
    upid:{
        type: String
    }
},{
    timestamps: true
});
const model = mongoose.model('Posts',schema);
module.exports = model;