interface DataItem {
  name: string
  count: number
}

interface Data {
  [key: string]: DataItem[]
}

interface Result {
  success: boolean
  errMsg?: string
  data: Data | null | boolean
}

const getResponseData =  (data: Data | null | boolean, errMsg?: string): Result => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data
    }
  }
  return {
    success: true,
    data
  }
}

export default getResponseData