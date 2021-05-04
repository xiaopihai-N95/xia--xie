interface Result {
  success: boolean
  errMsg?: string
  data: any
}

const getResponseData = (data: any, errMsg?: string): Result => {
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

export default getResponseData