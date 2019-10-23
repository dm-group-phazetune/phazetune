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
const { editUserProf, getUserProf } = profController;

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
// const rooms = [
//   "General",
//   "Country",
//   "Hip-Hop/R&B",
//   "Dance/EDM",
//   "Christian/Gospel",
//   "Holiday/Season",
//   "Latin",
//   "Jazz",
//   "Rock",
//   "Pop",
//   "Classical",
//   "Children"
// ];

// io.of("/chat");
// io.on("connection", socket => {
//   let room;
//   socket.on("joinRoom", room => {
//     console.log(room);
//     if (rooms.includes(room)) {
//       room = `Room: ${room}`;
//       socket.join(room);
//       io.of("/chat");
//       io.in(room).emit("newUser", "A user has joined the " + room);
//       return socket.emit("success", "You have joined this room.");
//     } else {
//       return socket.emit("err", "Room does not exist.");
//     }
//   });
//   // client sends a message
//   socket.on("newMessage", message => {
//     console.log("got message", message);
//     io.to(room).emit("newMessage", message);
//   });
// });
// Socket messages
let messages = [];
let users = [];

// When socket connects
const chat = io.of("/chat");
chat.on("connect", socket => {
  socket.on("addUser", username => {
    socket.id = username;
    users.push({ user: socket.id });
    chat.emit("usersInChat", { users });
    messages.push({ message: `${socket.id} entered the chat.` });
    chat.emit("userEntered", { messages });
  });

  // When user sends a new message
  socket.on("sendMsg", data => {
    console.log(`Message received: ${data.username}: ${data.message}`);
    const { username, message } = data;
    messages.push({
      username,
      message,
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
      // let hours = Math.floor(num / 60);
      // var minutes = num % 60;
      // return hours + ":" + minutes;
    });
    chat.emit("newMsg", { messages });
  });

  // When user disconnects
  socket.on("disconnect", () => {
    const remainingUsers = users.filter(user => user.user !== socket.id);
    users = remainingUsers;
    chat.emit("usersInChat", { users });
    messages.push({ message: `${socket.id} left the chat.` });
    chat.emit("userLeft", { messages });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../"));
});

http.listen(SERVER_PORT, () => {
  console.log(`SERVER LISTENING ON PORT: ${SERVER_PORT}`);
});
