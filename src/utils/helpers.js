require("dotenv").config();
const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_PRIVATE_KEY;

// login
const generateAuthToken = ({ name, email, id, password }) =>
  jwt.sign({ name, email, id, password }, privateKey);
console.log(privateKey);

const verifyAuthToken = (token) => {
  return jwt.verify(token, privateKey);
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
