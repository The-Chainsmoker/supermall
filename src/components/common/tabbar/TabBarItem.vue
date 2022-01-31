<template>
  <!-- 用盒子包裹插槽就可以保留样式 -->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot v-if="!isActive" name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <!-- <div :class="{active:isActive}"> -->

    <!-- 父组件传值给组件动态决定颜色 -->
    <!-- <div :style="{color: isActive? activeColor: '' }"> -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String,
    },
    activeColor: {
      type: String,
      default: '#1296db',
    },
  },
  data() {
    return {
      // isActive: true,
    }
  },
  computed: {
    isActive() {
      //获得的显示页面的路由地址和点击的获得地址相同时不为-1,则返回true
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      // this.isActive是计算属性;
      //{}里面也可以三元运算符
      return this.isActive ? { color: this.activeColor } : {}
    },
  },
  methods: {
    itemClick() {
      //点击事件比页面跳转执行的要快
      this.$router.push(this.path).catch((err) => {})
    }, //抛出重复点击的异常
  },
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  background: #f6f6f6;
  display: flex;
  flex-direction: column;
}

.tab-bar-item .iconfont {
  font-size: 23px;
  margin-bottom: 3px;
}

.item-text {
  font-size: 13px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

/* style动态决定 */
/* .active {
  color: #1296db;
} */
</style>