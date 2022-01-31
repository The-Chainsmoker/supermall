<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in cgoods" :key="index" :good-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem.vue'
export default {
  name: 'GoodsList',
  props: {
    cgoods: {
      type: Array,
      default() {
        return []
      },
    },
  },
  components: { GoodsListItem },
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>

