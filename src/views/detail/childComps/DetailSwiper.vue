<template>
  <swiper class="detail-swiper">
    <swiper-item class="swiper" v-for="(item ,index) in topImages" :key="index">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper';

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>