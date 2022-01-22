<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true, //包裹内部是否开启点击事件
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

      this.scroll.on('scroll', (posiontin) => {
        this.$emit('srcoll', posiontin)
      })

      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    })
  },
  methods: {
    //封装scrollTo方法
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    //封装finishPullUp方法
    finishPullUp() {
      this.scroll.finishPullUp()

      this.scroll.refresh() //处理图片异步加载不能及时计算高度
    },
    refresh() {
      this.scroll.refresh()
    },
  },
}
</script>

<style scoped>
</style>