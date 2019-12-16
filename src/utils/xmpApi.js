const xmpApi = {
  setStorage(data) {
    mpvue.setStorage({ key: data.key, data: data.data })
  }
}
export default xmpApi
