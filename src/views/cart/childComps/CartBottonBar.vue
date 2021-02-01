<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="total-price">合计：{{totalPrice}}</div>

    <div class="calculate" @click="calcClick">结算：({{checkedLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton';

import { mapGetters } from 'vuex';

export default {
  name: 'CartBottomBar',
  components: { CheckButton },
  computed: {
    ...mapGetters(['cartList']),

    totalPrice() {
      return (
        '￥' +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },

    checkedLength() {
      return this.cartList.filter((item) => item.checked).length;
    },

    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        // 全部选中
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        // 部分或全部未选中
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择想要购买的商品', 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: relative;
  bottom: 4px;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}

.check-area {
  display: flex;
  align-items: center;
  width: 77px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 5px 0 10px;
}
.total-price {
  margin-left: 62px;
  flex: 1;
}
.calculate {
  width: 88px;
  text-align: center;
  line-height: 30px;
  background-image: linear-gradient(to right, rgba(254, 114, 0), rgba(255, 75, 0));
  margin: 4px 0;
  border-radius: 60px;
}
</style>