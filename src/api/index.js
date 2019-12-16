import request from '@/utils/request'
// let test = 'http://192.168.1.50:8089/api'
let test = 'http://news-at.zhihu.com'
test = process.env.NODE_ENV === 'development' ? test : '/api'
export default {
  test(params) {
    return request(test + '/v1/test/index', params, 'get')
  },
  getNewsLatest(params) {
    return request(test + '/api/2/news/latest', params, 'get')
  }
}
