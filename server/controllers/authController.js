const bcrypt = require("bcryptjs");

// tn - Get User
async function getUser(req, res) {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  }
}

// tn - User Register
async function register(req, res) {
  
}

// tn - User Login
async function login(req, res) {}

// tn - User Logout
async function logout(req, res) {}

module.exports = {
  getUser,
  register,
  login,
  logout
};
