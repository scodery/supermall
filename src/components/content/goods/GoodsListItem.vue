<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load="imageLoad" />
    <div class="goods-info">
      <p>{{product.title}}</p>
      <span class="price">{{product.price}}</span>
      <span class="collect">{{product.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.product.image || this.product.show.img;
    },
  },
  methods: {
    // 监听每张图片是否加载完成
    imageLoad() {
      this.$bus.$emit('itemImageLoad');
    },
    // 调转到详情页
    itemClick() {
      this.$router.push('/detail/' + this.product.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding: 2px;
  width: 50%;
  position: relative;
  padding-bottom: 40px;
}
.goods-item img {
  width: 100%;
  height: 267px;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>