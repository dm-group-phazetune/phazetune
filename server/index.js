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
const { addPost } = require("./controllers/postsController");

// Auth Endpoints
app.get("/auth/user", getUser);
app.post("/auth/register", register);
app.post("/auth/login", login);
app.post("/auth/logout", logout);
// Posts Endpoints
app.post("/api/posts", addPost);
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
app.get("/api/profile/user/:username", getUserProf);
app.put("/api/profile/user", editUserProf);
// Follow Endpoints
app.post("/api/user/:user_id");
app.delete("/api/user/:user_id");

io.of("/chat");
io.on("connection", socket => {
  let room;
  socket.on("joinRoom", room => {
    console.log(room);
    if (rooms.includes(room)) {
      room = `Room: ${room}`;
      socket.join(room);
      io.of("/chat");
      io.in(room).emit("newUser", "A user has joined the " + room);
      return socket.emit("success", "You have joined this room.");
    } else {
      return socket.emit("err", "Room does not exist.");
    }
  });
  // client sends a message
  socket.on("newMessage", message => {
    console.log("got message", message);
    io.to(room).emit("newMessage", message);
  });
});

// General Chat
let messages = [];
let users = [];

// When user connects in General Chat
const chat = io.of("/chat");
chat.on("connect", socket => {
  socket.on("addUser", username => {
    socket.id = username;
    users.push({ user: socket.id });
    chat.emit("usersInChat", { users });
    messages.push({ message: `${socket.id} entered the chat.` });
    chat.emit("userEntered", { messages });
  });

  // When user sends a new message in General Chat
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
    console.log(messages);
  });

  // When user disconnects from General Chat
  socket.on("disconnect", () => {
    const remainingUsers = users.filter(user => user.user !== socket.id);
    users = remainingUsers;
    chat.emit("usersInChat", { users });
    messages.push({ message: `${socket.id} left the chat.` });
    chat.emit("userLeft", { messages });
  });
});

// Artists Chat
let artistsMessages = [];
let artistsUsers = [];

// When user connects in Artists Chat
const artists = io.of("/artists");
artists.on("connect", socket => {
  socket.on("addUser", username => {
    socket.id = username;
    artistsUsers.push({ user: socket.id });
    artists.emit("usersInChat", { artistsUsers });
    artistsMessages.push({ message: `${socket.id} entered the chat.` });
    artists.emit("userEntered", { artistsMessages });
  });

  // When user sends a new message in Artists Chat
  socket.on("sendMsg", data => {
    console.log(`Message received: ${data.username}: ${data.message}`);
    const { username, message } = data;
    artistsMessages.push({
      username,
      message,
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
      // let hours = Math.floor(num / 60);
      // var minutes = num % 60;
      // return hours + ":" + minutes;
    });
    artists.emit("newMsg", { artistsMessages });
  });

  // When user disconnects from Artists Chat
  socket.on("disconnect", () => {
    const remainingUsers = users.filter(user => user.user !== socket.id);
    artistUsers = remainingUsers;
    artists.emit("usersInChat", { artistsUsers });
    artistsMessages.push({ message: `${socket.id} left the chat.` });
    artists.emit("userLeft", { artistsMessages });
  });
});

// Producers Chat
let producersMessages = [];
let producersUsers = [];

// When user connects in Artists Chat
const producers = io.of("/producers");
producers.on("connect", socket => {
  socket.on("addUser", username => {
    socket.id = username;
    producersUsers.push({ user: socket.id });
    producers.emit("usersInChat", { producersUsers });
    producersMessages.push({ message: `${socket.id} entered the chat.` });
    producers.emit("userEntered", { producersMessages });
  });

  // When user sends a new message in Artists Chat
  socket.on("sendMsg", data => {
    console.log(`Message received: ${data.username}: ${data.message}`);
    const { username, message } = data;
    producersMessages.push({
      username,
      message,
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
      // let hours = Math.floor(num / 60);
      // var minutes = num % 60;
      // return hours + ":" + minutes;
    });
    producers.emit("newMsg", { producersMessages });
  });

  // When user disconnects from Artists Chat
  socket.on("disconnect", () => {
    const remainingUsers = users.filter(user => user.user !== socket.id);
    producersUsers = remainingUsers;
    producers.emit("usersInChat", { producersUsers });
    producersMessages.push({ message: `${socket.id} left the chat.` });
    producers.emit("userLeft", { producersMessages });
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../"));
// });

http.listen(SERVER_PORT, () => {
  console.log(`SERVER LISTENING ON PORT: ${SERVER_PORT}`);
});
