<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false,
    };
  },
  methods: {
    show(message = '正在加载中，请稍后...', duration = 2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  z-index: 9999;
}
</style>