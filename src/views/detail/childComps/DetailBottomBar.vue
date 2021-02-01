<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit('addCart');
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  background-color: #fff;
  position: relative;
  bottom: 0;
  display: flex;
  text-align: center;
  overflow: hidden;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 20px;
  height: 20px;
  margin: 7px auto -1px;
  background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
}

.bar-left .service {
  background-position: 0 -48px;
}

.bar-left .shop {
  background-position: 0 -90px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 42px;
}

.bar-right .cart {
  background-image: linear-gradient(to right, rgba(252, 196, 0), rgba(255, 150, 0));
}
.cart {
  height: 40px;
  font-size: 14px;
  margin-top: 5px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.bar-right .buy {
  background-image: linear-gradient(to right, rgba(254, 114, 0), rgba(255, 75, 0));
}
.buy {
  height: 40px;
  margin-top: 5px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.sport-ball {
  position: absolute;
  left: 225px;
  bottom: 18px;
}
</style>
