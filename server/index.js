const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
// const signalR = require("@microsoft/signalr")

app.use(cors({ origin: "*" }))

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`User connected: ${socket.id}`)
  }

  socket.on("request_url", (data) => {
    if (data.url) {
      //   let connection = new signalR.HubConnectionBuilder()
      //     .withUrl(url, {
      //       skipNegotiation: true,
      //       transport: signalR.HttpTransportType.WebSockets,
      //     })
      //     .configureLogging(signalR.LogLevel.Trace)
      //     // .withUrl("https://et-ms-broadcast-service-fd86485c64c5.herokuapp.com/notificationHub")
      //     .withAutomaticReconnect()
      //     .build()

      //   connection.on("SendNotification", (data) => {
      socket.broadcast.emit("feeds", { feed: url + "/feeds" })
      //   })

      //   connection.on("SendHits", (data) => {
      socket.broadcast.emit("hit", { hit: url + "/hits" })
      //   })

      //   connection.start()
      // .then(() => connection.invoke("SendMessage", "Hello"));
    }
  })
})

// io.on("error", () => {
//   io.close()
// })

server.listen(8000, () => {
  console.log("SERVER IS RUNNING")
})
