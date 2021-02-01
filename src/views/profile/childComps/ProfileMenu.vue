<template>
  <div class="menu">
    <div>
      <img src="~assets/img/profile/message.svg" />
      <span>我的消息</span>
    </div>
    <div>
      <img src="~assets/img/profile/pointer.svg" />
      <span>积分商城</span>
    </div>
    <div>
      <img src="~assets/img/profile/vip.svg" />
      <span>会员卡</span>
    </div>
    <div class="cart" @click="cartClick">
      <img src="~assets/img/profile/cart.svg" />
      <span>我的购物车</span>
    </div>
    <div>
      <img src="~assets/img/profile/shopping.svg" />
      <span>下载购物APP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileMenu',
  methods: {
    cartClick() {
      this.$router.push('/cart');
    },
  },
};
</script>

<style scoped>
.menu div {
  height: 45px;
  border-bottom: 1px solid #eee;
  line-height: 45px;
  font-size: 14px;
  box-sizing: border-box;
}
.menu div img {
  height: 20px;
  width: 20px;
  vertical-align: middle;
  margin: 0 12px;
}
.menu .cart {
  border-top: 8px solid #eee;
  height: 53px;
}
</style>