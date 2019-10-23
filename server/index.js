require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const app = express();
// Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// Controllers
const authController = require("./controllers/authController");
const postsController = require("./controllers/postsController");
const profController = require("./controllers/profController");
const followController = require("./controllers/followController");
// Dotenv
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

// Middleware
app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

// Database Connection
massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db connected!");
});

// De-structured controllers
const { getUser, register, login, logout } = authController;
const { editUserProf, getUserProf} = profController

// Auth Endpoints
app.get("/auth/user", getUser);
app.post("/auth/register", register);
app.post("/auth/login", login);
app.post("/auth/logout", logout);
// Posts Endpoints
app.post("/api/posts");
app.put("/api/posts/:post_id");
app.post("/api/posts/comments/:post_id");
app.post("/api/posts/favorites/:post_id");
app.delete("/api/posts/favorites/:post_id");
// Posts - Profile
app.get("/api/posts/user");
// Posts - Newsfeed
app.get("/api/posts/favorites/:post_id");
app.get("/api/posts/user/genre");
app.get("/api/posts/:user_id");
// Posts - Explore
app.get("/api/posts");
app.get("/api/posts/genre");
// Profile endpoints
app.get("/api/profile/user", getUserProf);
app.put("/api/profile/user", editUserProf);
// Follow Endpoints
app.post("/api/user/:user_id");
app.delete("/api/user/:user_id");

//socket endpoint

let generalMessages = [];
let 


app.post("/login", (req, res) => {
  req.session.username = req.body.username;
});

io.on("connection", socket => {
  socket.emit("onConnection", {
    message: "Sockets has been connected"
  });
  socket.on("messageSend", data => {
    messages.push({
      message: data.message,
      username: data.username
    });
    io.emit("newMessage", messages);
  });
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../"));
});

http.listen(SERVER_PORT, () => {
  console.log(`SERVER LISTENING ON PORT: ${SERVER_PORT}`);
});
