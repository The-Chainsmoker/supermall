<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probeType='3' :pull-up-load='true' @srcoll="contentScroll" @pullingUp="loadMore">
      <home-swiper :cbanners='banners' />
      <recommend-view :crecommend='recommend' />
      <feature-view />
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" />
      <goods-list :cgoods="showGood" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMuitidata, getHomeGoods } from 'network/home'

import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from 'views/home/childComps/RecommendView'
import FeatureView from 'views/home/childComps/FeatureView'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
export default {
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
    }
  },
  created() {
    //请求轮播图,推荐各四条数据
    this.getHomeMuitidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  computed: {
    showGood() {
      return this.goods[this.currentType].list
    },
  },
  methods: {
    //点击图标回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    //上拉监听要一定的距离显示上拉图标
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
    },
    //拉载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
      setTimeout(() => {
        this.$refs.scroll.finishPullUp()
      }, 3000)
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

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  /* 粘性布局在batter-srcoll包裹里失效 */
  /* position: sticky; */
  top: 44px;
  z-index: 9;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
}

/* 跟粘性定位一样,对立的方向设置数值产生拉伸的效果 */
/* .content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
} */
</style>