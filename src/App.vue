<template>
  <div id="app">
    <main-tab-bar class="main-tab-bar" />
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar';
export default {
  name: 'App',
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import 'assets/css/base.css';
.main-tab-bar {
  z-index: 9;
}
</style>
