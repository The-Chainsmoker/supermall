<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item" />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from 'views/cart/childComps/CartListItem.vue'

export default {
  name: 'CartList',
  data() {
    return {}
  },
  components: { Scroll, CartListItem },
  computed: {
    //获取调用vuex的getters函数
    ...mapGetters(['cartList']),
  },
  activated() {
    //进入组件加载数据后刷新滚动区域页面
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
.content {
  /* 这里的100vh也是整个屏幕的,不考虑其他的组件内容占的高度 */
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>