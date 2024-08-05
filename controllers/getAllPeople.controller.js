const db = require('../models/user.model');
const getUserData = require('../utils/getUsername');
const usersModel = require('../models/user.model');

const people = async (req, res) => {
    try {
        const userData = getUserData(req);
        console.log("Fetching all the people for ", userData);
        const userDoc = await usersModel.findOne({ username: userData.username });
        
        if (!userDoc || !userDoc.category_pref || userDoc.category_pref.length === 0) {
            console.log("💀💀💀💀💀💀💀💀")
            return res.status(400).send("User category preference not found");
        }

        const userPref = userDoc.category_pref[0];
        const people = await db.find({});
        
        people.sort((a, b) => {
            const aLove = a.category_pref ? a.category_pref[0] : '';
            const bLove = b.category_pref ? b.category_pref[0] : '';

            if (aLove === userPref && bLove !== userPref) {
                return 1;
            } else if (aLove !== userPref && bLove === userPref) {
                return -1;
            } else {
                return 0;
            }
        });

        res.status(200).send(people);
    } catch (e) {
        console.log("ERROR IN GetAllPeople.js: ", e);
        res.status(500).send("Error in GetAllPeople.js");
    }
};

module.exports = people;
