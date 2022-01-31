import { debounce } from "./utils"
// mixins 选项接收一个混入对象的数组。
// 这些混入对象可以像正常的实例对象一样包含实例选项，(支持合并声明周期函数)
// 这些选项将会被合并到最终的选项中
/* 例子:
创建混入对象 var mixin = {
  created: function () { console.log(1) }
}

组件对象中 mixins: [mixin]

*/
export const itemListenerMixin = {//给Home,Detail组件共用
  data() {
    return {
      itemItemListen: null, //回调事件
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 100)

    this.itemItemListen = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemItemListen)
  }
}