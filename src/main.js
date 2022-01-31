import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import FastClick from 'fastclick'
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.use(toast)//Toast插件封装方式(或者直接封装方式)
//Vue.use(Object|Fuction) 
// 如果是个对象必须提供install方法，如果是个函数，把这个函数作为install方法
// install调用时会将Vue作为参数传入

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')//图片正在加载中的替换的图片
})


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()//在Vue原型添加事件总线对象

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')//等于el:'#app',两种都是创建并挂载到 #app (会替换 #app)
