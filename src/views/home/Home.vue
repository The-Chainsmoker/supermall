<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <tab-control v-show="isTabFixed" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol1" />

    <scroll class="content" ref="scroll" :probeType='3' :pull-up-load='true' @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :cbanners='banners' @swiperImageLoad="swiperImageLoad" />
      <recommend-view :crecommend='recommend' />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol2" />
      <goods-list :cgoods="showGood" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMuitidata, getHomeGoods } from 'network/home'

import { debounce } from 'common/utils'
import { itemListenerMixin } from '@/common/mixin'

import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from 'views/home/childComps/RecommendView'
import FeatureView from 'views/home/childComps/FeatureView'
export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [], //轮播数据
      recommend: [], //四个推荐数据
      goods: {
        //更多商品数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop', //选中的商品类型
      isShowBackTop: false, //是否隐藏回顶部的图标
      tabOffsetTop: 0, //轮播图片加载完成后,tabControl的精确距离
      isTabFixed: false, //tabControl是否吸顶
      saveY: 0, //保存滚动的距离
      // itemItemListen: null, //$bus的自定义回调事件
    }
  },
  mixins: [itemListenerMixin], // 选项接收一个混入对象的数组,这些选项将会被合并到最终的选项中
  created() {
    //请求轮播图,推荐各四条数据
    this.getHomeMuitidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    /* 
    // function debounce(func, delay){}
    //传参如 定义函数const man=function(){} ==> debounce(function(){},delay){} / debounnce(man,delay){}
    const refresh = debounce(this.$refs.scroll.refresh, 50) //不写延迟时间也会有延迟

    //对监听的事件进行保存
    this.itemItemListen = () => {
      refresh()
    }
    //$bus定义Eventbus事件总线(监视每张图片刷新)
    this.$bus.$on('itemImageLoad', this.itemItemListen)
     */
  },
  computed: {
    //动态选择商品类型列表
    showGood() {
      return this.goods[this.currentType].list
    },
  },
  //进到Home页面先滚动对应的位置
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    //$refs.scroll==>dom元素 .scroll.y==>对象方法
    // this.saveY = this.$refs.scroll.scroll.y

    //调用封装方法
    this.saveY = this.$refs.scroll.getScrollY()

    /* 
    vm.$off( [event, callback] )
    参数：
    {string | Array<string>} event (只在 2.2.2+ 支持数组)
    {Function} [callback]
    用法：
    移除自定义事件监听器。
    如果没有提供参数，则移除所有的事件监听器；
    如果只提供了事件，则移除该事件所有的监听器；
    如果同时提供了事件与回调，则只移除这个回调的监听器。
    */
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemItemListen)
  },
  methods: {
    //监听轮播图片加载完成后,在获取tabcontrol的offsetTop距离屏幕的顶部的距离
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
    },
    //点击图标回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    //上拉监听
    contentScroll(position) {
      // 1.判断BackTop图标是否显示
      this.isShowBackTop = -position.y > 1000
      // 2.判断tabcontrol是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    //拉载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    //请求轮播图,推荐各四条数据
    getHomeMuitidata() {
      getHomeMuitidata().then((res) => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    //请求对应的商品类型的数据并存储起来
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list) //把list数组拆开存入
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp() //滚动到底部可以多次触发监听事件
      })
    },
    //选中商品的类型
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //让两个tab-control变得同步
      this.$refs.tabcontrol2.currentIndex = index
      this.$refs.tabcontrol1.currentIndex = index
    },
  },
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
  /* margin-top: 44px; */
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时,为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* 粘性布局在batter-srcoll包裹里失效 */
.tab-control {
  position: relative;
  z-index: 9;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
} */

/* 跟粘性定位一样,对立的方向设置数值产生拉伸的效果 */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
</style>