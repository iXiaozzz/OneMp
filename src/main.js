import Vue from 'vue'
import App from './App'
import MinPromise from 'minapp-promise'
import Store from './store/'
import Utils from './utils/index'
Vue.prototype.$store = Store
Vue.prototype.$utils = Utils
Vue.prototype.$MinPromise = MinPromise
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
