import Vue from 'vue'
import App from './App'
import mixin from './assets/js/mixin'
import vant from './assets/js/vant'
import store from './assets/js/store'
import './css/common.css'
import './css/iconfont.css'
// import 'mpvue-calendar/src/style.css'
Vue.mixin(mixin)
Vue.config.productionTip = false
App.mpType = 'app'
// 把store挂载到Vue原型上
Vue.prototype.$store = store
const app = new Vue(App)
app.$mount()
// globalData是全局的数据，可以跨页面使用
Vue.prototype.globalData = getApp().globalData
Object.assign(Vue.prototype, vant)
