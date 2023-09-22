export const MAX_DATA_COUNTER = 20

const stackData = <T extends {}>(data: T, dataArray: T[]) => {
  const temp = dataArray
  temp.unshift(data)
  return temp
}

const removeData = <T extends {}>(dataArray: T[]) => {
  const temp = dataArray
  temp.splice(temp.length - 1, 1)
  return temp
}

export const handleDataStream = <T extends {}>(dataArray: T[]) => {
  return (data: T) => {
    if (dataArray.length < MAX_DATA_COUNTER) {
      return stackData(data, dataArray)
    }
    if (dataArray.length === MAX_DATA_COUNTER) {
      const temp = removeData(dataArray)
      return stackData(data, temp)
    }
    return dataArray
  }
}
