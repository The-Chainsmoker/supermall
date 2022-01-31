import Vue from 'vue'

import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {

  //把toast组件的dom节点加到index.html的里body的dom节点里
  // document.body.appendChild(Toast.$el)//Toast的节点还没创建

  //创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //new的方式根据组件构造器创建一个组件对象
  const toast = new toastContrustor()

  //将组件对象，手动挂载到摸一个元素上(一种方法参数时element)
  toast.$mount(document.createElement('div'))

  //另一种是参数String,创建并挂载到 #smokers (会替换 #app)
  // toast.$mount("#smokers")

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  //原型上引入可以全局组件引用
  Vue.prototype.$toast = toast//时Vue组件实例不是导入组件！！！

}

export default obj