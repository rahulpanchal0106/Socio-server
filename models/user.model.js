const mongoose=require('mongoose');


const schema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:false
    },
    username:{
        type:String,
        unique: true
    },
    password:{
        type:String
    },
    bio:{
        type:String
    },
    profilePicture:{
        type:String
    },
    followers:{
        type:[
            {
                email:{
                    type:String,
                    unique:true,
                    required:false
                },
                username:{
                    type:String,
                    unique: true
                },
                password:{
                    type:String
                },
                bio:{
                    type:String
                },
                profilePicture:{
                    type:String
                },
                followers:{
                    type:Array,
                },
                following:{
                    type:Array
                },
            
                uid:{
                    type:String
                }
            }
        ],
    },
    following:{
        type:Array
    },

    uid:{
        type:String
    }
})

module.exports = mongoose.model('user',schema);