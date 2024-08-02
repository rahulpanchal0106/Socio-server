const jwt = require('jsonwebtoken');
const db = require('../models/user.model');
const JWT_SECRET = process.env.JWT_SECRET || 'cat';

const login = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Validate input
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        if (!username && !email) {
            console.log("Username or Email is required")
            return res.status(400).json({ message: "Username or Email is required" });
        }

        // Find user in the database
        let user;
        if (username) {
            user = await db.findOne({ username });
        } else if (email) {
            user = await db.findOne({ email });
        }

        if (!user) {
            console.log(`${username || email} not found!`);
            return res.status(400).json({ message: `"${username || email}" username not found` });
        }

        // Check password
        if (password !== user.password) {
            console.log(`${username || email} failed to login! - Wrong password`);
            return res.status(401).json({ message: `Invalid password for ${username || email}` });
        }

        // Password is correct, generate JWT token
        console.log(`${username || email} logged in!`);

        const token = jwt.sign({ uid: user.uid, username: user.username }, JWT_SECRET, { expiresIn: '100h' });

        res.status(200).json({ message: `${username || email} logged in successfully`, token: token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = login;
