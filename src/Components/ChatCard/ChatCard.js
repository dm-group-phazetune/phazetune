// import React, { Component } from "react";
// import { connect } from "react-redux";
// import io from "socket.io-client";

// class ChatCard extends Component {
//   constructor() {
//     super();
//     this.state = {
//       messages: [],
//       userMessage: "",
//       socket: io("/chat")
//     };
//   }

//   componentDidMount() {
//     this.state.socket.on("connect", () => {});
//     this.state.socket.on("welcome", msg => {
//       console.log("Received: ", msg);
//     });
//     this.state.socket.on("joinRoom");
//     this.state.socket.on("newUser", res => {
//       console.log(res);
//     });
//     this.state.socket.on("newMessage", data => {
//       this.setState({ messages: data });
//     });
//     this.state.socket.on("sucesss", res => {
//       console.log(res);
//     });
//   }

//   render() {
//     return (
//       <div>
//         <ul>
//           {this.state.messages.map((val, i) => {
//             return (
//               <li key={i}>
//                 {val.username} : {val.message}
//               </li>
//             );
//           })}
//         </ul>
//         <input
//           className="chat-input"
//           onChange={e => this.state({ userMessage: e.target.value })}
//         />

//         <button
//           onClick={() => {
//             this.state.socket.emit("messageSend", {
//               messages: this.state.userMessage,
//               username: this.props.username
//             });
//           }}
//         >
//           Send!
//         </button>
//       </div>
//     );
//   }
// }

// function mapStateToProps(reduxState) {
//   return {
//     username: reduxState.username
//   };
// }

// export default connect(mapStateToProps)(ChatCard);
