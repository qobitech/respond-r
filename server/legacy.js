const express = require("express")
const app = express()
const cors = require("cors")
const signalR = require("@microsoft/signalr")

const PORT = 8080

app.use(cors({ origin: "*" }))

app.get("/api/sse", (req, res) => {
  try {
    console.log("Client connected")

    // res.setHeader("Content-type", "text/event-stream")
    // res.setHeader("Access-Control-Allow-Orgin", "*")

    res.writeHead(200, {
      "Content-type": "text/event-stream",
      "Cache-control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": req.headers.origin,
    })

    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://df22636a607b.ngrok.app/notificationHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Trace)
    //   // .withUrl("https://et-ms-broadcast-service-fd86485c64c5.herokuapp.com/notificationHub")
    //   .withAutomaticReconnect()
    //   .build()

    connection.on("SendNotification", (data) => {
      res.write(`data: ${JSON.stringify({ yam: "beans" })}`)
    })

    connection.on("SendHits", (data) => {
      res.write(`data: ${JSON.stringify({ egg: "fish" })}`)
    })

    connection.start()
    // // .then(() => connection.invoke("SendMessage", "Hello"));

    // // const intervalid = setInterval(() => {
    // //   const date = new Date().toLocaleDateString()
    // //   res.write(`data: ${date}\n\n`)
    // // }, 1000)

    // res.on("close", () => {
    //   // clearInterval(intervalid)
    //   connection.stop().then(() => {
    //     console.log("Client closed connection")
    //   })
    //   res.end()
    // })
    // res.send(200).json({ message: "successful", data: "sent data" })
    // res.write(`data: ${JSON.stringify({ beans: "rice" })}\n\n`)
  } catch (e) {
    res.on("error", (err) => {})
  }
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
