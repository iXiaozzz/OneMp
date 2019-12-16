export default {
  formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(this.formatNumber).join('/')
    const t2 = [hour, minute, second].map(this.formatNumber).join(':')

    return `${t1} ${t2}`
  },
  formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
  },
  getCookie(name) {
    if (!document.cookie.length) return
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)

    if (Array.isArray(arr)) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  setCookie(name, value, days = 30) {
    let exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  },
  deleteAllCookies() {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i]
      var eqPos = cookie.indexOf('=')
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + `=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  },
  /**
   * 将URL的参数转化为对象
   * */
  param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
    )
  },
  // 获取屏幕宽度
  getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  },
  // 获取屏幕高度
  getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },
  // 处理async/await的异常
  async errorCaptured(asyncFunc) {
    try {
      let res = await asyncFunc()
      return [null, res]
    } catch (e) {
      return [e, null]
    }
  },
  // 防抖函数
  debounce(func, wait = 50, immediate = false) {
    let timer, context, args
    const later = () => setTimeout(() => {
      timer = null
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)
    return function (...params) {
      // 如果没有创建延迟执行函数（later），就创建一个
      if (!timer) {
        timer = later()
        // 如果是立即执行，调用函数
        // 否则缓存参数和调用上下文
        if (immediate) {
          func.apply(this, params)
        } else {
          context = this
          args = params
        }
        // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
        // 这样做延迟函数会重新计时
      } else {
        clearTimeout(timer)
        timer = later()
      }
    }
  },
  // 节流函数
  throttle(func, wait = 50) {
    // 上一次执行 fn 的时间
    let previous = 0
    // 将 throttle 处理结果当作函数返回
    return function (...args) {
      // 获取当前时间，转换成时间戳，单位毫秒
      let now = +new Date()
      // 将当前时间和上一次执行函数的时间进行对比
      // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
      if (now - previous > wait) {
        previous = now
        func.apply(this, args)
      }
    }
  },
  formatDate(date) {
    var myyear = date.getFullYear()
    var mymonth = date.getMonth() + 1
    var myweekday = date.getDate()

    if (mymonth < 10) {
      mymonth = '0' + mymonth
    }
    if (myweekday < 10) {
      myweekday = '0' + myweekday
    }
    return (myyear + '-' + mymonth + '-' + myweekday)
  },
  /**
   * 随机生成[m,n]之间的随机数
   */
  createNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  /**
   * 判断是否在微信中打开
   */
  isweixin() {
    const ua = window.navigator.userAgent.toLowerCase()
    return !!(ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger')
  },
  /**
   * 判断是否是对象
   */
  isObject(obj) {
    return typeof obj === 'object' && obj !== null
  },
  /**
   * 深度拷贝
   * @param {拷贝的对象} source
   * @param {已拷贝的值} hash
   */
  deepClone(source, hash = new WeakMap()) {
    if (!this.isObject(source)) return source
    if (hash.has(source)) return hash.get(source)
    let target = Array.isArray(source) ? [] : {}
    hash.set(source, target)
    for (let key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (this.isObject(source[key])) {
          target[key] = this.deepClone(source[key], hash)
        } else {
          target[key] = source[key]
        }
      }
    }
    return target
  },
  // 延时函数 t:时间
  delay(t) {
    return new Promise(resolve => {
      setTimeout(resolve, t)
    })
  }
}
