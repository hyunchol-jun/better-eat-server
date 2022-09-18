const express = require("express");
const knex = require("knex")(require("./knexfile"));
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

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

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });

    knex("users")
        .insert({
            name, email, password
        })
        .then(() => {
            res.json({ 
                success: 'true',
                message: "Successfully signed up."
            });
        })
        .catch((error) => {
            res.status(500).json({error});
        })
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });

    knex("users")
        .where({ email: email })
        .then(rows => {
            const user = rows[0];

            if (user && user.password === password) {
                let token = jwt.sign({ 
                    email: email
                }, process.env.JWT_SECRET);

                res.json({ token });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Login failed. Please check your email and password."
                });
            }
        })
        .catch(error => {
            return res.status(500).json({error});
        })
})

app.get("/users", authorize, (req, res) => {
    knex("users")
        .then(userData => {
            res.json(userData);
        })
        .catch(error => {
            res.status(500).json({error});
        })
});

app.listen(PORT, () => {
    console.log("Server running on PORT: ", PORT);
})