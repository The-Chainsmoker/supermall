<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :ctopImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :comment="commentInfo" ref="comment" />
      <goods-list :cgoods="recommands" ref="recommend" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { debounce } from '@/common/utils'
import { itemListenerMixin } from '@/common/mixin'

import { getRecommend } from 'network/home'
import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'

import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from 'views/detail/childComps/DetailSwiper'
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo.vue'
import DetailBottomBar from 'views/detail/childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'

import BackTop from 'components/content/backTop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast,
  },
  data() {
    return {
      iid: null, //商品iid
      topImages: [], //轮播图图片
      goods: {}, //商品信息
      shop: {}, //创建店铺信息的对象
      detailInfo: {}, //商品的详情数据
      paramInfo: {}, //参数的信息
      commentInfo: {}, //评论的信息
      recommands: [], //详情推荐信息
      themeTopYs: [], // tab-control的切换滚动位置
      getThemeTopY: null, //封装防抖防抖获取滚动位置
      // itemItemListen: null,
      currentIndex: null, //tab-control选中状态
      isShowBackTop: false, //滚动图标
      message: '',
      show: false,
    }
  },
  mixins: [itemListenerMixin], // 选项接收一个混入对象的数组,这些选项将会被合并到最终的选项中
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播数据
      const data = res.result
      // 2.取出轮播图信息
      this.topImages = data.itemInfo.topImages
      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 6 .获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //7.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      //3.获取详情推荐信息
      getRecommend().then((res) => {
        this.recommands = res.data.list
      })

      //根据最新的数据,对应的DoM是已经被渲染出来
      //但是created()的图片依然是没有加载完
      //this.$nextTick(() => {this.$nextTick 将回调延迟到下次DOM更新循环之后执
      //this.$nextTick(() => {
      //this.themeTopYs=[]
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })

      //封装防抖防抖获取滚动位置
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //方法二,加入最大值,排除最大值的循环即可
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      }, 100)
    })
  },
  mounted() {},
  updated() {},
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemItemListen)
  },
  methods: {
    ...mapActions(['addCart']),

    //通过监听滚动位置
    contentScroll(position) {
      /* 
      positoiny和主题中值进行对比
      [0, 7938, 9120, 9452]
      positoinY 在0和7938之间, index =0
      positoinY在 7938和9120之间, index =1
      positoinY 9120 9452之a, index =2
      positoiny 超t 9120 f, index =3 
      */
      const positionY = -position.y

      //i定义的时时字符串
      // for (let i in this.themeTopYs) i是字符串,需要转换成NUmber型

      // 方法一不加入最大值
      // this.themeTopYs.forEach((item, i, arr) => {
      //   if (
      //     //if判断===> (防止赋值) && (满足i=1,2 true  i=3越界)|| (满足 i=3 true,防止i+1=4数组越界)
      //     this.currentIndex != i &&
      //     ((i < arr.length - 1 && positionY >= arr[i] - 44 && positionY < arr[i + 1] - 44) ||
      //       (i === arr.length - 1 && positionY > arr[i] - 44)) //减44是滚动区域距离屏幕还有44px
      //   ) {
      //     this.currentIndex = i
      //     this.$refs.nav.currentIndex = this.currentIndex //通过dom拿组件的data的属性
      //   }
      // })

      //方法二,加入最大值,排除最大值的循环即可
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] - 44 &&
          positionY < this.themeTopYs[i + 1] - 44
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex //通过dom拿组件的data的属性
        }
      }

      //滚动到1000显示回滚图标
      this.isShowBackTop = -position.y > 1000
    },
    //监听图片加载完
    imageLoad() {
      //滚动区域刷新
      this.$refs.scroll.refresh()

      //等detail-goods-info组件的图片加载完在获取每个tab-control的对应的滚动位置位置
      //不需要在最后goods-list组件的图片加载调用(offsetTop是获取一开始的位置,图片靠后的位置不影响定位)
      this.getThemeTopY()
    },
    //监听tab-control的点击
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 50)
    },
    //点击回滚效果
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    //点击购物车事件
    addToCart() {
      const product = {}
      product.imge = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // this.$store.commit('addCart', product)
      this.addCart(product).then((res) => {
        this.$toast.showToast(res, 1500)
        console.log(res)
      })

      //使用mapActions使用Actions里函数, 也支持载荷(参数)
      // this.addCart(product).then((res) => {
      //   this.show = true
      //   this.message = res
      //   setTimeout(() => {
      //     this.show = false
      //   }, 1500)
      //   //提示窗核心思想:先让提示窗被监听事件打开,再setTimeout设置关闭的时间
      // })

      // this.$store.dispatch('addCart', product).then((res) => {
      //   console.log(res)
      // })
    },
  },
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-nav {
  /* 相对定位的保留原来位置,里面内容可以随意的移动 */
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  /* 除去头部和底部导航高度 */
  height: calc(100% - 44px - 33px);
}
</style>