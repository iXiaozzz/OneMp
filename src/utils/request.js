// import Fly from 'flyio'
import Fly from 'flyio/dist/npm/wx'
import qs from 'qs'
const fly = new Fly()
fly.config.timeout = 10 * 1000
const request = function (url, data = {}, method = 'post', contentType = false) {
  return new Promise((resolve, reject) => {
    const options = { url, method }
    options['headers'] = {
      'platform': 'mp',
      'requestAim': '',
      'Authorization': '',
      'clientKey': '',
      'path': '/'
    }
    if (method.toLowerCase() === 'get') {
      options.params = data
    } else {
      if (contentType) {
        options.data = data
      } else {
        options.data = qs.stringify(data)
      }
    }
    fly.request(options).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export default request
