import React from "react"

export const useFileDownload = (): ((endpoint: string) => void) => {
  const handleDownload = (endpoint: string) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        // Check if JSON data is available
        if (data) {
          // Convert JSON to string
          const jsonString = JSON.stringify(data, null, 2)
          // Create a Blob from the JSON string
          const blob = new Blob([jsonString], { type: "application/json" })
          // Create a URL for the Blob
          const url = URL.createObjectURL(blob)
          // Create a link element
          const link = document.createElement("a")
          // Set the href attribute of the link to the Blob URL
          link.href = url
          // Set the download attribute of the link to the desired filename
          link.download = "data.json"
          // Append the link to the document body
          document.body.appendChild(link)
          // Click the link to trigger the download
          link.click()
          // Remove the link from the document body
          document.body.removeChild(link)
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
  }

  return handleDownload
}
