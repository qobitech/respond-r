const express = require("express")
const app = express()
const ffmpeg = require("fluent-ffmpeg")
const pathToFfmpeg = require("ffmpeg-static")

ffmpeg.setFfmpegPath(pathToFfmpeg)

var cors = require("cors")

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.get("/hls", (req, res) => {
  const rtspUrl = req.query.rtsp // Replace with your RTSP stream URL

  res.header("Content-Type", "application/vnd.apple.mpegurl")

  ffmpeg()
    .input(rtspUrl)
    .inputFormat("rtsp")
    .videoCodec("copy")
    .audioCodec("copy")
    // .outputOptions([
    //   "-hls_time 10", // Set segment duration
    //   "-hls_list_size 6", // Set playlist size
    // ])
    .outputOptions([
      "-hls_time 10",
      "-hls_list_size 6",
      "-hls_flags delete_segments",
      "-hls_segment_filename stream%03d.ts",
    ])
    .format("hls")
    .pipe()
    .on("start", (data) => {
      console.log("stream started", data)
    })
    .on("end", () => {
      console.log("HLS stream generation complete.")
    })
    .on("error", (err) => {
      console.error("Error:", err)
    })
    .pipe(res, { end: true })
  //   }
})

const port = 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
