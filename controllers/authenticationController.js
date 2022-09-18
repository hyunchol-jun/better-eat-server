const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) 
        return res.status(401).json({
            success: false, 
            message: "This route requires authorization header."
        });

    if (authHeader.indexOf("Bearer") === -1)
        return res.status(401).json({
            success: false,
            message: "This route requires Bearer token."
        });

    const token = authHeader.split(" ")[1]; // Remove Bearer string to get the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401)
                    .json({ 
                        success: false,
                        message: "The token is invalid."
                    });
        } 

        req.decoded = decoded;
        next();
    });
};

const signUpUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });

    // Hash password
    const saltRounds = 10;
    let hashedPassword = "";
    try {
        hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to perform the sign up. Please try again."
        });

    }

    try {
        await userModel.setOne({name, email, passwordHash: hashedPassword});
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                success: false,
                message: "This email is already taken. Try with a different one."
            })
        }

        res.status(500).json({
            success: false,
            message: error
        });
    }

    res.json({
        success: 'true',
        message: "Successfully signed up."
    });
}

const logInUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });

    let foundUsers = [];
    try {
        foundUsers = await userModel.getOne({email: email});
    } catch (error) {
        return res.status(500).json({error});
    }

    if (foundUsers.length !== 1) {
        return res.status(401).json({
            success: false,
            message: "Invalid login credentials."
        });
    }
    
    const user = foundUsers[0];

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, user.passwordHash);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        });
    }

    if (!isValidPassword) {
        return res.status(401).json({
            success: false,
            message: "Invalid login credentials."
        });
    }

    const token = jwt.sign({ 
        email: email
    }, process.env.JWT_SECRET);

    res.json({ 
        success: true,
        message: "Successfully logged in.",
        token 
    });
};

module.exports = {authorize, signUpUser, logInUser};