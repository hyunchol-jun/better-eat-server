const express = require("express");
const knex = require("knex")(require("./knexfile"));
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
// const BASE_URL = process.env.BASE_URL;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/users", (req, res) => {
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