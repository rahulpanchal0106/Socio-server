const db = require('../models/user.model');
const getUserData = require('../utils/getUsername');
const usersModel = require('../models/user.model')
const people=async (req,res)=>{
    try{
        const userData = getUserData(req);
        console.log("Fetching all the people for ",userData);
        const userDoc = await usersModel.findOne({username:userData.username});
        const people = await db.find({});
        people.sort((a,b)=>{
            const aLove = a.category_pref || [];
            const bLove = b.category_pref || [];

            if(aLove!==userDoc.category_pref[0] && bLove===userDoc.category_pref[0]){
                return 1;
            }else if(aLove===userDoc.category_pref[0] && bLove!==userDoc.category_pref[0]){
                return -1;
            }else{
                return 0;
            }
        })
        // console.log(people)
        res.status(200).send(people)
        // res.status(400).send(null)
    }catch(e){
        console.log("ERROR IN GetAllPeople.js: ",e)
        res.status(500).send("Error in gettAllPeople.js")
    }
}
module.exports=people