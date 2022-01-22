<template>
  <div id="HomeSwiper">
    <swiper>
      <swiper-item v-for="(item,index) in cbanners" :key="index">
        <a :href="item.link">
          <img :src="item.image">
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
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
}
</script>

<style scoped>
</style>