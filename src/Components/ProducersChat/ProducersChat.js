import React, { useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const useStyles = makeStyles(() => ({
  chatbox: {
    backgroundColor: "#6497b1",
    color: "white",
    width: "90vw",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Raleway, sans-serif",
    fontWeight: "bold",
    marginTop: "8.5vh",
    letterSpacing: ".06em"
  },
  chatboxLeft: {
    width: "20%",
    height: "100%",
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
    backgroundColor: "#e7eff6"
  },
  button: {
    width: "20%",
    boxSizing: "border-box",
    padding: "5px",
    color: "#024a81",
    borderRadius: "5px",
    border: "1px solid transparent",
    backgroundColor: "#9fbea1",
    fontSize: "16px",
    fontFamily: "$body-fontfamily",
    letterSpacing: "0.12em",
    textTransform: "uppercase"
  }
}));

function ProducersChat() {
  const classes = useStyles();
  const username = useSelector(
    initialState => initialState.authReducer.username
  );
  const [messages, setMessages] = React.useState([]);
  const [producers, setUsers] = React.useState([]);
  let [userMessage, setUserMessage] = React.useState("");
  const [socket, setSocket] = React.useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSocket(io("/producers"));
  }, []);

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("addProducer", username);
      });

      socket.on("producersInChat", data => {
        const producersInChat = data.producersUsers;
        setUsers(producersInChat);
      });

      socket.on("producerEntered", data => {
        const producerEnteredMsg = data.producersMessages;
        setMessages(producerEnteredMsg);
      });

      socket.on("newProducerMsg", data => {
        const newMessages = data.producersMessages;
        setMessages(newMessages);
      });

      socket.on("producerLeft", data => {
        const userLeftMsg = data.producersMessages;
        setMessages(userLeftMsg);
      });

      socket.on("reconnect", () => {
        if (username) {
          socket.emit("addProducer", username);
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
              {producers.map((user, i) => {
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
            <header className={classes.chatboxRightTitle}>Producers</header>
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
                    socket.emit("sendProducerMsg", message);
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

export default ProducersChat;
