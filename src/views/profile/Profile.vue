<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">我的档案</div>
    </nav-bar>
    <profile-login />
    <profile-credit />
    <profile-menu />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

import ProfileLogin from './childComps/ProfileLogin';
import ProfileCredit from './childComps/ProfileCredit';
import ProfileMenu from './childComps/ProfileMenu';

export default {
  name: 'Profile',
  components: {
    NavBar,
    ProfileLogin,
    ProfileCredit,
    ProfileMenu,
  },
};
</script>

<style scoped>
.profile-nav {
  background-color: rgba(255, 142, 150);
  font-size: 18px;
  color: #fff;
}
</style>