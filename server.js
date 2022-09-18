const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authenticationController = require("./controllers/authenticationController");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

const usersRoutes = require("./routes/usersRoutes");
app.use("/users", usersRoutes);

app.post("/signup", authenticationController.signUpUser);
app.post("/login", authenticationController.logInUser);

app.listen(PORT, () => {
    console.log("Server running on PORT: ", PORT);
})