<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      class="tabcontrol"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import NavBar from 'components/common/navbar/NavBar';

// 网络请求
import { getHomeMultidata, getHomeGoods } from 'network/home';
import { itemListenerMixin, backTopMixin, tabControlMixin } from 'common/mixin';
import { MAX_POSITION } from 'common/content';

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    NavBar,
  },
  mixins: [itemListenerMixin, backTopMixin, tabControlMixin],
  data() {
    return {
      banners: [], // 对轮播图的数据进行数据封装
      recommends: [], // 对recommend-view的数据封装
      goods: {
        // 对精选(pop)，新款(news)，流行(sell) 的数据封装
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      tabOffsetTop: 0,
      isTabFixed: false,
      savaY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // activated/deactivated防止出现position.y被修改，保存上一次离开时的y值
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1. 保存离开时的y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 2. 取消全局事件goodsitem图片监听
    this.$bus.$off('itemLoad', this.itemImgListener);
  },
  created() {
    /* 生命周期函数 --> 判断是否请求成功 */
    // 1. 请求多个数据(异步操作)
    this.getHomeMultidata();

    // 2. 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    contentScroll(position) {
      // 1. 判断BackTop是否显示
      this.isShowBackTop = -position.y > MAX_POSITION;

      // 2. 决定tabControl是否吸（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop - 40;
    },
    loadMore() {
      // 上拉请求更多数据
      this.getHomeGoods(this.currentType);

      // 刷新数据，重新计算数据高度
      this.$refs.scroll.scroll.refresh();
    },

    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性 ==> $el，用于获取组件中的元素
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    // 请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.recommends = res.data.data.recommend.list;
        this.banners = res.data.data.banner.list;
      });
    },
    // 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        // 说明上拉完成，可以进行下一次上拉
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script> 

<style scoped>
#home {
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tabcontrol {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
}
.content {
  height: calc(100% - 48px);
  overflow: hidden;
  background-color: #fff;
}
</style>