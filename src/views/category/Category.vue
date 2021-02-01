<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>
    <div class="content">
      <tab-nav :selections="selections" @tabClick="tabClick" />

      <scroll class="tab-content" ref="scroll" @categoryItemLoad="imageLoad">
        <categories-item :categoryData="showSubcategory" />
        <tab-control :titles="['流行','新款','精选']" />
        <goods-list />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';
import CategoriesItem from 'components/content/category/CategoriesItem';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';

import TabNav from './childComps/TabNav';

import { getCategory, getSubcategory } from 'network/category';
import { tabControlMixin } from 'common/mixin';
export default {
  name: 'Category',
  components: {
    NavBar,
    Scroll,
    CategoriesItem,
    TabControl,
    GoodsList,
    TabNav,
  },
  data() {
    return {
      selections: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  mixins: [tabControlMixin],
  activated() {
    this.$refs.scroll.refresh();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData;
    },
  },
  created() {
    // 请求侧边分类数据
    getCategory().then((res) => {
      const data = res.data.data;
      // 请求侧边栏的数据
      this.selections = data.category.list;

      // 请求第一栏的数据
      this._getSubcategories(0);
    });
  },
  methods: {
    tabClick(index) {
      // 给数据绑定index
      this._getSubcategories(index);
    },

    _getSubcategories(index) {
      this.currentIndex = index;
      const maitKey = this.selections[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        // 请求每一栏的数据
        this.categoryData = res.data.data;
      });
    },
    imageLoad() {
      // 重新计算页面高度
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
  display: flex;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-content {
  height: 100%;
  flex: 1;
  overflow: hidden;
}
</style>