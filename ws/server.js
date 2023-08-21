var express = require("express");
const http = require("http");
const WebSocket = require("ws");
// var cookieParser = require("cookie-parser");
// var session = require("express-session");
// var fs = require("node:fs");
// var path = require("node:path");
// var cluster = require("node:cluster");
// var { Worker, isMainThread, parentPort } = require("node:worker_threads");
// var multer = require("multer");

var app = express();

// Below line can be used to bring up the stand alone web socket server(without http)
// const server = new WebSocket.Server({ port: "3333" });

// Below line can be used to create the web socket server from the http server
const httpServer = http.createServer(app); // creating the http server from express app instance
const ws_server = new WebSocket.Server({ server: httpServer });

// event to handle when the connection is established from the client
ws_server.on("connection", (socket) => {
  console.log("Client connected...!");

  // event listener to receive the message
  socket.on("message", (message) => {
    console.log("Message received: ", message.toString());
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

// to enable web socket connection along with the http, we are running the http server
httpServer.listen(3333, () =>
  console.log("server started, waiting for the messages from the client")
);
