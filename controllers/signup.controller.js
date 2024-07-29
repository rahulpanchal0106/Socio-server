const generate_UID = require('../utils/uidGenerator');
const db = require('../models/user.model');

const signup= async (req, res) => {
    const { username, password, email } = req.body;
    var data;
    try{

        
            if (!username && !email) {
                return res.status(400).json({ message: "Username or Email is required" });
            }
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            // if ) {
            //     return res.status(400).json({ message: "Email is required" });
            // }
        
            const uid = generate_UID();
        
            data = {
                username: username,
                password: password,
                email: email?email:uid,
                uid: uid
            };
        
            // console.log(data);
            console.log(username, " signing up");
    }catch(e){
        console.log("ERROR IN SIGNUP: ",e)
    }

    try {
        await db.create(data);
        console.log(username, " signed up!");
        res.status(201).json({ message: `${username} Sign up success` });
    } catch (e) {
        console.log("Signup err: ", e);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports=signup;