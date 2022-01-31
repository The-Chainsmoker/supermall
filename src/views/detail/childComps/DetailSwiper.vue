<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in ctopImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index'
export default {
  name: 'DetailSwiper',
  props: {
    ctopImages: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
}
</style>

