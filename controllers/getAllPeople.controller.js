const db = require('../models/user.model');

const people=async (req,res)=>{
    const people = await db.find({});
    console.log(people)
    res.send(people)
}
module.exports=people