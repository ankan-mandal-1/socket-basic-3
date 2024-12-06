const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app)


const {Server} = require("socket.io")
const io = new Server(expressServer);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// io.on("connection", (socket) => {
//     console.log("New user connected")

//     socket.on("chat", (msg) => {
//         io.emit("chat_transfer", msg)
//     })
// })

io.on("connection", (socket) => {
    
    socket.join("kitchen-room");
    let sizeOfKitchen = io.sockets.adapter.rooms.get("kitchen-room").size;
    io.sockets.in("kitchen-room").emit("cooking", "Fried Rice cooking" + sizeOfKitchen)

    socket.join("bed-room");
    io.sockets.in("bed-room").emit("sleep", "I am sleeping")
    io.sockets.in("bed-room").emit("rest", "I am taking rest")

})

expressServer.listen(3000, () => {
    console.log("Server running on PORT 3000")
})