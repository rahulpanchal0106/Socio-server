const generate_UID = require('../utils/uidGenerator');
const db = require('../models/user.model');

const signup= async (req, res) => {
    const { username, password, email } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const uid = generate_UID();

    const data = {
        username: username,
        password: password,
        email: email,
        uid: uid
    };

    console.log(data);
    console.log(username, " signing up");

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