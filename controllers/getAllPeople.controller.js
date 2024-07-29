const db = require('../models/user.model');

const people=async (req,res)=>{
    try{
        const people = await db.find({});
        // console.log(people)
        res.status(200).send(people)
    }catch(e){
        console.log("ERROR IN GetAllPeople.js: ",e)
        res.status(500).send("Error in gettAllPeople.js")
    }
}
module.exports=people