<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建 BScroll 对象
    let wrapper = this.$refs.wrapper;
    this.scroll = new BScroll(wrapper, {
      click: true,
      /* 
        probe:侦测滚动
        0/1：都不侦测
          2：只有手指在内容区滑动时侦测
          3：只要内容区滑动都侦测
      */
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 2. 监听上拉事件 scroll到底部时
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      });
    }

    // 3. 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position);
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // 跳转代码
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      // 结束此次上拉事件
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // 数据刷新
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>