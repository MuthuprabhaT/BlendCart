const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Irin Admin",
    email: "irin@email.com",
    password: bcrypt.hashSync("Irin", 10),
    isAdmin: true,
  },
  {
    name: "JohnDoe",
    email: "johndoe@email.com",
    password: bcrypt.hashSync("JohnDoe", 10),
    isAdmin: false,
  },
  {
    name: "Kelvin",
    email: "kelvin@email.com",
    password: bcrypt.hashSync("Kelvin", 10),
    isAdmin: false,
  },
];

module.exports = users;
