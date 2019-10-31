import React, { useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const useStyles = makeStyles(() => ({
  chatbox: {
    backgroundColor: "#5a5759",
    color: "white",
    width: "90vw",
    height: "82vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "none",
    marginTop: "8.5vh",
    letterSpacing: ".06em"
  },
  chatboxLeft: {
    width: "20%",
    height: "90%",
    padding: "10px",
    borderRight: "1px solid white",
    textTransform: "uppercase",
    lineHeight: "1.218em"
  },
  chatboxLeftTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    paddingTop: "15px",
    fontWeight: "bold",
    fontStyle: "italic"
  },
  chatboxRight: {
    width: "80%",
    height: "95%",
    padding: "10px"
  },
  chatboxRightTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    paddingTop: "1px",
    fontWeight: "bold",
    fontStyle: "italic"
  },
  chatboxRightMessages: {
    height: "90%",
    width: "100%"
  },
  chatboxRightMessageSend: {
    display: "flex",
    justifyContent: "flex-start",
    height: "5%",
    margin: "5px"
  },
  input: {
    width: "80%",
    padding: "6px",
    borderRadius: "5px",
    border: "1px solid transparent",
    backgroundColor: "#e7eff6",
    display: "inline",
    backgroundColor: "transparent",
    boxSizing: "border-box",
    border: "2px solid #ed5eb7",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
  },
  button: {
    width: "20%",
    boxSizing: "border-box",
    padding: "5px",
    color: "#FFFFFF",
    borderRadius: "5px",
    border: "1px solid transparent",
    backgroundColor: "#ed5eb7",
    fontSize: "16px",
    fontFamily: "Oswald, sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase"
  },
  buttonHover: {
    backgroundColor: "#FFFFFF",
    cursor: "pointer"
  }
}));

function ArtistsChat() {
  const classes = useStyles();
  const username = useSelector(
    initialState => initialState.authReducer.username
  );
  const [messages, setMessages] = React.useState([]);
  const [artists, setUsers] = React.useState([]);
  console.log(artists);
  let [userMessage, setUserMessage] = React.useState("");
  const [socket, setSocket] = React.useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSocket(io("/artists"));
  }, []);

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("addArtist", username);
      });

      socket.on("artistsInChat", data => {
        console.log(data);
        console.log(data.artistsUsers);
        const artistsInChat = data.artistsUsers;
        setUsers(artistsInChat);
      });

      socket.on("artistEntered", data => {
        const userEnteredMsg = data.artistsMessages;
        setMessages(userEnteredMsg);
      });

      socket.on("newArtistsMsg", data => {
        const newMessages = data.artistsMessages;
        setMessages(newMessages);
      });

      socket.on("artistLeft", data => {
        const userLeftMsg = data.artistsMessages;
        setMessages(userLeftMsg);
      });

      socket.on("reconnect", () => {
        if (username) {
          socket.emit("addArtist", username);
        }
      });

      socket.on("disconnect");
    }
  }, [socket, username]);

  const clearInput = () => {
    setUserMessage("");
  };

  return (
    <div>
      <div className="Chatrooms-container">
        <Paper className={classes.chatbox}>
          <nav className={classes.chatboxLeft}>
            <h1 className={classes.chatboxLeftTitle}>Chat</h1>
            <hr />
            <div>
              Users in the chat:
              {artists.map((user, i) => {
                return (
                  <div key={i}>
                    <ul>
                      <li>{user.user}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </nav>
          <span className={classes.chatboxRight}>
            <header className={classes.chatboxRightTitle}>Artists</header>
            <hr />
            <main className={classes.chatboxRightMessages} ref={messagesEndRef}>
              {messages.map((message, i) => {
                return (
                  <div key={i}>
                    <ul>
                      <div className="Username">
                        <li>{message.username}</li>
                      </div>
                      <div className="User-message">
                        <li>{message.message}</li>
                      </div>
                    </ul>
                  </div>
                );
              })}
            </main>
            <span>
              <form className={classes.chatboxRightMessageSend}>
                <input
                  placeholder="Message.."
                  className={classes.input}
                  value={"" || `${userMessage}`}
                  onChange={e => setUserMessage(e.target.value)}
                />
                <button
                  className={classes.button}
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    let message = {
                      username: username,
                      message: userMessage
                    };
                    socket.emit("sendArtistsMsg", message);
                    clearInput();
                  }}
                >
                  SEND
                </button>
              </form>
            </span>
          </span>
        </Paper>
      </div>
    </div>
  );
}

export default ArtistsChat;
