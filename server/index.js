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
const genreController = require("./controllers/genreController");
// Dotenv
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

// Middleware
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req)
//   next();
// })

app.use( express.static( `${__dirname}/../build` ) );



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
const { genreType } = genreController

const {
  addPost,
  getPastPosts,
  getAllPosts,
  editPost,
  deletePost
} = require("./controllers/postsController");

// const {followUser, checkFollow} = require('./controllers/followController');

// Auth Endpoints
app.get("/auth/user", getUser);
app.post("/auth/register", register);
app.post("/auth/login", login);
app.post("/auth/logout", logout);
// Posts Endpoints
app.post("/api/posts", addPost);
// app.post("/api/posts/comments/:post_id");
// app.post("/api/posts/favorites/:post_id");
app.put("/api/posts/:post_id", editPost);
app.delete("/api/posts/:post_id", deletePost);
app.delete("/api/posts/favorites/:post_id");
// Posts - Newsfeed
// app.get("/api/posts/favorites/:post_id");
// app.get("/api/posts/user/genre");
app.get("/api/posts/:user_id", getPastPosts);
app.get("/api/users/post", getAllPosts);
// Posts - Explore
// app.get("/api/posts");
app.get("/api/type", genreType);
// Profile endpoints
app.get("/api/profile/user/:username", getUserProf);
app.put("/api/profile/user", editUserProf);
// Follow Endpoints
// app.post("/api/follow/:following_id", followUser);
// app.get("/api/follow/:following_id", checkFollow)
// app.delete("/api/follow/:following_id");
//genre

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
    messages.push({ message: "Welcome to the General Chat" });
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
  socket.on("addArtist", username => {
    socket.id = username;
    artistsUsers.push({ user: socket.id });
    artists.emit("artistsInChat", { artistsUsers });
    artistsMessages.push({ message: "Welcome to the Artists Chat" });
    artistsMessages.push({ message: `${socket.id} entered the chat.` });
    artists.emit("artistEntered", { artistsMessages });
  });

  // When user sends a new message in Artists Chat
  socket.on("sendArtistsMsg", data => {
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
    artists.emit("newArtistsMsg", { artistsMessages });
  });

  // When user disconnects from Artists Chat
  socket.on("disconnect", () => {
    const remainingUsers = users.filter(user => user.user !== socket.id);
    artistUsers = remainingUsers;
    artists.emit("artistsInChat", { artistsUsers });
    artistsMessages.push({ message: `${socket.id} left the chat.` });
    artists.emit("artistLeft", { artistsMessages });
  });
});

// Producers Chat
let producersMessages = [];
let producersUsers = [];

// When user connects in Artists Chat
const producers = io.of("/producers");
producers.on("connect", socket => {
  socket.on("addProducer", username => {
    socket.id = username;
    producersUsers.push({ user: socket.id });
    producers.emit("producersInChat", { producersUsers });
    producersMessages.push({ message: "Welcome to the Producers Chat" });
    producersMessages.push({ message: `${socket.id} entered the chat.` });
    producers.emit("producerEntered", { producersMessages });
  });

  // When user sends a new message in Artists Chat
  socket.on("sendProducerMsg", data => {
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
    producers.emit("newProducerMsg", { producersMessages });
  });

  // When user disconnects from Artists Chat
  socket.on("disconnect", () => {
    const remainingUsers = users.filter(user => user.user !== socket.id);
    producersUsers = remainingUsers;
    producers.emit("producersInChat", { producersUsers });
    producersMessages.push({ message: `${socket.id} left the chat.` });
    producers.emit("producerLeft", { producersMessages });
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../"));
// });

http.listen(SERVER_PORT, () => {
  console.log(`SERVER LISTENING ON PORT: ${SERVER_PORT}`);
});
