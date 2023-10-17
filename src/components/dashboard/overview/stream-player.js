import React from "react"
import JSMpeg from "@cycjimmy/jsmpeg-player"
import "./index.scss"

export default class Stream extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recordStatus: "No Recording",
      recordedBlobs: [],
      recButton: false,
      dowButton: true,
      stopButton: true,
      labStartBtn: true,
      labStopBtn: true,
    }
    const mediaSource = new MediaSource()
    mediaSource.addEventListener(
      "sourceopen",
      () => this.handleSourceOpen,
      false
    )
  }
  componentDidMount() {
    let canvas = document.getElementById("video-canvas")
    let url = "ws://localhost:9999"

    new JSMpeg.Player(url, { canvas: canvas })
  }
  handleSourceOpen = (event) => {
    console.log("MediaSource opened")
    this.sourceBuffer = this.mediaSource.addSourceBuffer(
      'video/webm; codecs="vp8"'
    )
    console.log("Source buffer: ", this.sourceBuffer)
  }

  handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      this.setState({
        recordedBlobs: [...this.state.recordedBlobs, event.data],
      })
    }
  }

  record = () => {
    let canvas = document.getElementById("video-canvas")
    const stream = canvas.captureStream()
    this.startRecording(stream)
    console.log(stream)
  }

  handleStop = (event) => {
    console.log("Recorder stopped: ", event)
    //const superBuffer = new Blob(this.state.recordedBlobs, { type: 'video/webm' });
    //this.video.src = window.URL.createObjectURL(superBuffer);
  }
  startRecording = (stream) => {
    this.setState({ labStartBtn: false })
    let options = { mimeType: "video/webm" }
    //this.recordedBlobs = [];
    try {
      this.mediaRecorder = new MediaRecorder(stream, options)
    } catch (e0) {
      console.log("Unable to create MediaRecorder with options Object: ", e0)
      try {
        this.options = { mimeType: "video/webm,codecs=vp9" }
        this.mediaRecorder = new MediaRecorder(stream, options)
      } catch (e1) {
        console.log("Unable to create MediaRecorder with options Object: ", e1)
        try {
          options = "video/vp8" // Chrome 47
          this.mediaRecorder = new MediaRecorder(stream, options)
        } catch (e2) {
          alert(
            "MediaRecorder is not supported by this browser.\n\n" +
              "Try Firefox 29 or later, or Chrome 47 or later, " +
              "with Enable experimental Web Platform features enabled from chrome://flags."
          )
          console.error("Exception while creating MediaRecorder:", e2)
          return
        }
      }
    }
    console.log(
      "Created MediaRecorder",
      this.mediaRecorder,
      "with options",
      options
    )
    this.setState({ recordStatus: "Recording..." })
    this.setState({ recButton: true })
    this.setState({ stopButton: false })
    this.mediaRecorder.onstop = this.handleStop
    this.mediaRecorder.ondataavailable = this.handleDataAvailable
    this.mediaRecorder.start(100) // collect 100ms of data
    console.log("MediaRecorder started", this.mediaRecorder)
  }
  stopRecording = () => {
    this.mediaRecorder.stop()
    console.log("Recorded Blobs: ", this.state.recordedBlobs)
    this.setState({ recordStatus: "No Recording" })
    this.setState({ recButton: false })
    this.setState({ stopButton: true })
    this.setState({ dowButton: false })
  }
  play = () => {
    this.video.play()
  }
  download = () => {
    const blob = new Blob(this.state.recordedBlobs, { type: "video/mp4" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.style.display = "none"
    a.href = url
    let name = new Date().toLocaleString()
    a.download = name + ".mp4"
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 100)
  }
  render() {
    return (
      <div className="stream-canva-box">
        <canvas id="video-canvas"></canvas>
      </div>
    )
  }
}
