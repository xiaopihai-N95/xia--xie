interface Result {
  success: boolean
  errMsg?: string
  data: any
}

const getResposeData = (data: any, errMsg?: string): Result => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data
    }
  } else {
    return {
      success: true,
      data
    }
  }
}

export default getResposeData
