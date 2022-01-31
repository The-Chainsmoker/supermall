<template>
  <div id="HomeSwiper">
    <swiper>
      <swiper-item v-for="(item,index) in cbanners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
        </a>
      </swiper-item>

    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index'

export default {
  props: {
    cbanners: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      banners: this.banners,
      isLoad: false,
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    },
  },
}
</script>

<style scoped>
</style>