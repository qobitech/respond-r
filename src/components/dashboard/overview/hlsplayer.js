import React, { Component } from "react"
import { TypeSmallButton } from "utils/new/button"
import videojs from "video.js"
import "video.js/dist/video-js.css"

class HLSPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("Player is ready")
    })
  }

  componentDidUpdate() {
    this.player.on("error", (error) => {
      console.log(error, "juju")
    })
  }

  reload = () => {
    this.player.load()
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={(node) => (this.videoNode = node)} className="video-js" />
        </div>
        <div className="video-controller-prime">
          <TypeSmallButton title="Reload" onClick={this.reload} />
        </div>
      </div>
    )
  }
}

export default HLSPlayer
