/* 混入代码 */
import { debounce } from "./utils";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    };
  },
  mounted() {
    // 1. debounce函数可以控制事件的频繁访问，增加性能
    let refresh = debounce(this.$refs.scroll.refresh, 200);

    // 2. 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    };

    // 3. 监听item中图片加载完成
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  }
};

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  components: {
    BackTop,
    Scroll
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backClick() {
      // 回到顶部
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
};

import { NEW, POP, SELL } from "./content";
export const tabControlMixin = {
  data() {
    return {
      currentType: POP
    };
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    }
  }
};
