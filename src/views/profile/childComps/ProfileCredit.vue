<template>
  <div class="credit">
    <div>
      <p class="count">
        <span>0.00</span>元
      </p>
      <p>我的余额</p>
    </div>
    <div>
      <p class="count">
        <span>0</span>个
      </p>
      <p>我的优惠</p>
    </div>
    <div>
      <p class="count">
        <span>0</span>分
      </p>
      <p>我的积分</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCredit',
};
</script>

<style scoped>
.credit {
  display: flex;
  height: 90px;
  border-bottom: 8px solid #eee;
}
.credit > div {
  flex: 1;
  font-size: 15px;
  text-align: center;
}
.count {
  margin: 15px 0 5px 5px;
  font-size: 14px;
}
.count span {
  color: rgba(251, 117, 53);
  font-size: 24px;
}
</style>