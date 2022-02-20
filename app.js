const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Port = 5000 || process.env.PORT;
var cors = require("cors");

app.use(cors());

app.get("/api", (req, res) => {
   return res
      .status(200)
      .json({ error: false, message: "Server is up and running!" });
});

io.on("connection", (socket) => {
   console.log("a user connected");
   socket.on("disconnect", () => {
      console.log("user disconnected");
   });

   socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.emit("chat message", msg);
   });
});

app.get("/", (req, res) => {
   try {
      return res.sendFile(__dirname + "/client/index.html");
   } catch (error) {
      console.log(error);
   }
});

server.listen(Port, () => {
   console.log("listening on *:", Port);
});
