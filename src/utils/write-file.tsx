import { IAssets } from "interfaces/IAsset"
import React from "react"

const WriteAssetFile = ({ file }: { file: IAssets }) => {
  const handleClick = () => {
    let assets = file.data.map((i) => i.type)
    assets = assets.filter((item, index) => assets.indexOf(item) === index)
    const text = assets.join("\n")

    // Create a new Blob object containing the text
    const blob = new Blob([text], { type: "text/plain" })

    // Create a new URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a new anchor element
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "assetsType/assets.txt" // Set the file name
    document.body.appendChild(anchor)

    // Click the anchor to trigger the download
    anchor.click()

    // Clean up resources
    URL.revokeObjectURL(url)
    document.body.removeChild(anchor)
  }

  return (
    <button onClick={handleClick} className="d-none">
      Save Assets
    </button>
  )
}

export default WriteAssetFile
