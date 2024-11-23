export const getReportStatusBg = (status: string) => {
  //     Assigned (blue)
  // Accepted (yellow)
  // Closed (green)
  // Ignored (---)
  if (!status) return 'grey'
  switch (status.toLowerCase()) {
    case 'new':
      return 'red'
    case 'assigned':
      return 'blue'
    case 'accepted':
      return 'yellow'
    case 'closed':
      return 'green'
    default:
      return 'grey'
  }
}

export const getTime = (date: string) => {
  const currentDate = new Date(date)
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()
  const amPM = hours >= 12 ? 'PM' : 'AM' // Determine AM/PM

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12

  // Ensure minutes and seconds are displayed with leading zeros if less than 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPM}`
}
