const bcrypt = require("bcrypt");

const hashedPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

module.exports = [
  {
    id: 1,
    name: "Chol",
    email: "chol@example.com",
    password: hashedPassword("password")
  },
  {
    id: 2,
    name: "Yeri",
    email: "yeri@example.com",
    password: hashedPassword("password")
  },
  {
    id: 3,
    name: "Ina",
    email: "ina@example.com",
    password: hashedPassword("password")
  },
];