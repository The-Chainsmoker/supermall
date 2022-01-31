<template>
  <div id="Cart">
    <nav-bar class="cart_nav_bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list />
    <car-bottom-bar />

  </div>
</template>

<script>
import CartList from 'views/cart/childComps/CartList'
import CarBottomBar from 'views/cart/childComps/CarBottomBar'

import NavBar from 'components/common/navbar/NavBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CarBottomBar,
  },
  computed: {
    //获取vuex的getters的函数
    // cartLength() {
    //   return this.$store.getters.cartListLength
    // },

    //获取vuex的getters的函数
    // 语法一:
    // ...mapGetters(['cartListLength']),
    // 语法二:
    ...mapGetters({
      //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
      length: 'cartListLength', //自定义名称:getter函数
    }),
  },
}
</script>

<style scoped>
#Cart {
  height: 100vh;
}
.cart_nav_bar {
  background-color: var(--color-tint);
  color: white;
}
</style>