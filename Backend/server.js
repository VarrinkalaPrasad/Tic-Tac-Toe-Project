const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

io.on("connection", (socket) => {

  console.log("Player connected:", socket.id);

  socket.emit("boardUpdate", board);

  socket.on("makeMove", (index) => {

    if(board[index] === ""){

      board[index] = currentPlayer;

      currentPlayer = currentPlayer === "X" ? "O" : "X";

      io.emit("boardUpdate", board);

    }

  });

  socket.on("disconnect", () => {
    console.log("Player disconnected");
  });

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
