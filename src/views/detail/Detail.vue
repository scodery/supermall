<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="nav" />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imagesLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList';

import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail';
import { itemListenerMixin, backTopMixin } from 'common/mixin';
import { debounce } from 'common/utils';
import { MAX_POSITION } from 'common/content';

export default {
  name: 'Detail',
  components: {
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // 记录主题被点击
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.data.result;
      // 1. 获取顶部的图片轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 2. 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 3. 获取商家信息
      this.shop = new Shop(data.shopInfo);

      // 4. 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5. 获取商品的参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 6. 获取商品的评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3. 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
    });

    // 4. 给getThemeTopY赋值(防抖操作)
    this.getThemeTopY = debounce(() => {
      // 记录每次主题对应的位置
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 40);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 40);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 40);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  methods: {
    loadMore() {
      // 重新计算页面高度
      this.$refs.scroll.refresh();
    },
    imagesLoad() {
      // 重新计算页面高度
      this.$refs.scroll.refresh();

      // 调用回调函数 获取位置
      this.getThemeTopY();
    },
    contentScroll(position) {
      // 1. 获取y值
      const positionY = -position.y;

      // 2. 将获取到的positionY和主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 3. 判断BackTop是否显示
      this.isShowBackTop = -position.y > MAX_POSITION;
    },
    titleClick(index) {
      // 点击滚动到对应位置
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },

    // 添加商品到购物车
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2. 将商品添加到购物车
      this.$store.dispatch('addCart', product).then((res) => {
        this.$toast.show(res);
      });
    },
  },
  destroyed() {
    // 取消全局事件goodsitem图片监听
    this.$bus.$off('itemImgLoad', this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: calc(100vh - 93px);
}
.nav-bar {
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.content {
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}
</style>