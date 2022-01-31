<template>
  <div class="goods-item" @click="itemClick">
    <!-- @load监听图片事件加载完成事件 -->
    <!-- 使用vue-lazyload插件,v-lazy代替:src -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodItem.title}}</p>
      <span class="price">{{goodItem.price}}</span>
      <span class="collect">{{goodItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    showImage() {
      //判断传来是商品数据还是商品详情数据
      return this.goodItem.image || this.goodItem.show.img //两个商品的属性层级不一样!!!
    },
  },
  methods: {
    imageLoad() {
      //方法一(触发各自的自定义事件)
      // if (this.$route.path.indexOf('/home') !== -1) {
      //   this.$bus.$emit('itemImageLoad') //$bus定义Eventbus事件总线(监视每张图片刷新)
      // } else {
      //   this.$bus.$emit('detailImageLoad')
      // }

      //方法二(在各自页面的监听当前实例上的自定义事件完成后使用this.$bus.$off移除监听)
      this.$bus.$emit('itemImageLoad') //$bus定义Eventbus事件总线(监视每张图片刷新)
    },
    itemClick() {
      this.$router.push({ path: '/detail/' + this.goodItem.iid })
    },
  },
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>