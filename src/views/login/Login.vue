<template>
  <div class="login">
    <nav-bar class="login-nav">
      <div slot="left" @click="backClcik">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center">登录</div>
    </nav-bar>
    <p class="login-text">亲，欢迎登录</p>
    <p class="regiter-text">
      没有商品铺账号？
      <span class="register">立即注册</span>
    </p>
    <form action method="post">
      <div>
        <label for="username">用&nbsp;户：</label>
        <input type="text" id="username" placeholder="请输入手机号/会员名/邮箱" />
      </div>
      <div>
        <label for="password">密 &nbsp; 码：</label>
        <input type="password" name="password" id="password" placeholder="请输入您的密码" />
      </div>
    </form>
    <div>
      <button class="btnOk">确认</button>
    </div>

    <div class="help">寻求帮助</div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
export default {
  name: 'Login',
  components: {
    NavBar,
  },
  methods: {
    backClcik() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  overflow: hidden;
  margin-left: 15px;
  font-family: serif;
}

.login-nav {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: var(--color-tint);
  color: #f2f5f7;
  font-size: 18px;
}
.login-nav img {
  margin-top: 12px;
}

.login-text {
  margin-top: 140px;
  font-size: 24px;
  color: #000;
  font-weight: 400;
}

.regiter-text {
  margin-top: 8px;
  font-size: 15px;
}
.regiter-text .register {
  color: rgba(255, 75, 10);
}

form {
  margin-top: 40px;
}
form > div {
  margin: 10px 0;
}
form > div > input {
  outline-style: none;
  border: 0;
  border-bottom: 1px solid #ccc;
  width: 220px;
  height: 30px;
  font-size: 16px;
  box-sizing: border-box;
  padding: 0 4px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.075);
}

.btnOk {
  margin-top: 22px;
  height: 40px;
  border: 1px solid #fff;
  background-image: linear-gradient(to right, rgba(252, 196, 0), rgba(255, 150, 0));
  width: 280px;
  font-size: 18px;
  color: #fff;
  border-radius: 20px;
}

.help {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49px;
  text-align: center;
  line-height: 48px;
  background-color: #fff;
  z-index: 999;
}
</style>