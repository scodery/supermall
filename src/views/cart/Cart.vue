<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-botton-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

import CartList from './childComps/CartList';
import CartBottonBar from './childComps/CartBottonBar';

import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottonBar,
  },
  computed: {
    ...mapGetters(['cartLength']),
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>