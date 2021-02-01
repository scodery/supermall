<template>
  <div class="login">
    <div class="login-left left">
      <img src="~assets/img/profile/avatar.svg" class="avator-icon" />
      <div class="login-info">
        <div v-if="true">
          <p class="login-text">
            <span @click="loginClick">登录</span>/
            <span>注册</span>
          </p>
        </div>
        <div v-else>
          <span class="username">v-codery</span>
        </div>

        <p class="login-phone">
          <img src="~assets/img/profile/phone.svg" class="phone-icon" />
          <span v-if="isShow">暂无绑定手机号</span>
          <span v-else>手机号</span>
        </p>
      </div>
    </div>

    <div class="login-right right">
      <img src="~assets/img/common/arrow-left.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileLogin',
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    loginClick() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  padding-top: 20px;
  height: 80px;
  color: #fff;
  background-color: rgba(255, 142, 150);
}
.avator-icon {
  position: absolute;
  top: 15px;
  left: 10px;
  height: 60px;
  width: 60px;
}
.login-info {
  margin-left: 80px;
}
.login-text {
  margin: 0 0 8px 5px;
}
.phone-icon {
  height: 20px;
  width: 20px;
  vertical-align: middle;
}
.login-phone {
  font-size: 14px;
}
.login-right {
  height: 24px;
  width: 24px;
  margin: 8px 12px 0 0;
}
.login-right img {
  height: 100%;
  width: 100%;
}
</style>