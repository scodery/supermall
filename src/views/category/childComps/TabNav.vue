<template>
  <div class="tab-nav">
    <scroll class="content" ref="scroll">
      <div
        class="selections"
        v-for="(item,index) in selections"
        @click="itemClick(index)"
        :class="{active: index === currentIndex}"
      >{{item.title}}</div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';
export default {
  name: 'TabNav',
  components: { Scroll },
  props: {
    selections: {
      type: Array,
      default: {},
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    },
  },
};
</script>

<style scoped>
.tab-nav {
  height: calc(100vh - 93px);
}
.content {
  height: 100%;
  overflow: hidden;
}
.selections {
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: rgba(246, 246, 246);
}
.active {
  color: var(--color-tint);
  background-color: #fff;
  font-weight: 700;
}
</style>