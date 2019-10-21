const bcrypt = require("bcryptjs");

// tn - Get User
async function getUser(req, res) {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  }
}

// tn - User Register
async function register(req, res) {
  const db = req.app.get("db");
  const {
    first_name,
    last_name,
    username,
    password,
    location,
    photo,
    bio
  } = req.body;

  const foundUser = await db.auth.checkForUsername(username);

  if (foundUser[0]) {
    res.status(200).json("Username is taken.");
  } else {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    console.log(username);
    const newUser = await db.auth.registerUser([
      first_name,
      last_name,
      username,
      hash,
      location,
      photo,
      bio
    ]);

    req.session.user = {
      user_id: newUser[0].user_id,
      first_name: newUser[0].first_name,
      last_name: newUser[0].last_name,
      username: newUser[0].username,
      location: newUser[0].location,
      photo: newUser[0].photo,
      bio: newUser[0].bio,
      follow_count: newUser[0].follow_count
    };

    res.status(200).json(req.session.user);
  }
}

// tn - User Login
async function login(req, res) {
  const db = req.app.get("db");
  console.log("hit");
  const { username, password } = req.body;
  console.log(username, password);

  const foundUser = await db.auth.checkForUsername(username);

  if (!foundUser) {
    res.status(400).json("Username or Password is incorrect.");
  } else {
    const isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash);
    if (!isAuthenticated) {
      res.status(403).json("Username or Password is incorrect.");
    } else {
      req.session.user = {
        user_id: foundUser[0].user_id,
        first_name: foundUser[0].first_name,
        last_name: foundUser[0].last_name,
        username: foundUser[0].username,
        location: foundUser[0].location,
        photo: foundUser[0].photo,
        bio: foundUser[0].bio,
        follow_count: foundUser[0].follow_count
      };

      res.status(200).json(req.session.user);
    }
  }
}

// tn - User Logout
async function logout(req, res) {
  req.session.destroy();
  res.sendStatus(200);
}

module.exports = {
  getUser,
  register,
  login,
  logout
};
