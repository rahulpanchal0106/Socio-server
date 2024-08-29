const userModel = require("../models/user.model")

const searchPerson = async (username) =>{
    const data = await userModel.findOne({username:username},{ followers: 0, following: 0 });
    if(!data){
        return {}
    }
    return data;
}

module.exports = searchPerson