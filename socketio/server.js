var express = require("express");
const http = require("http");
const socketIO = require("socket.io");
// var cookieParser = require("cookie-parser");
// var session = require("express-session");
// var fs = require("node:fs");
// var path = require("node:path");
// var multer = require("multer");

var app = express();

// Below line can be used to bring up the stand alone web socket server(without http)
// const server = new WebSocket.Server({ port: "3333" });

// Below line can be used to create the web socket server from the http server
const httpServer = http.createServer(app); // creating the http server from express app instance
const socket = socketIO(httpServer, { cors: { origin: "*" } });

// event to handle when the connection is established from the client
socket.on("connection", (socket) => {
  console.log("Client connected...!");
  socket.emit("connection");

  // event listener to receive the message
  socket.on("message", (message) => {
    console.log("Message received: ", message.toString());

    // re emitting the messages to all the connected clients
    socket.emit(
      "message",
      `message (re-emitting the message back to the client) socket.id: ${socket.id}, message: ${message}`
    );
  });

  // to send message
  let i = 0;
  setInterval(() => {
    socket.send("Hello client: " + i++);
  }, 2000);
});

app.get("/", function (req, res) {
  res.send("Welcome");
});

// to enable web socket connection along with the http,  'socket.io' server instance
httpServer.listen(3333, () =>
  console.log("server started, waiting for the messages from the client")
);
