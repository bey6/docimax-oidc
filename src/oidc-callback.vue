<template>
  <div class="oidc-callback">
    <h3>认证成功，正在跳转···</h3>
  </div>
</template>

<script>
const TOOLONG = 'Too long to trans!';

export default {
  name: 'do-cb',
  data: () => ({
    claim: {}
  }),
  async created () {
    try {
      // 对应
      const user = await this.$um.signinRedirectCallback();
      this.claim = user;
      if (user.profile.sub === TOOLONG) {
        const res = await this.$axios.get(`${this.$authUrl}/Account/GetPermission/${user.profile.idp.toString().trim()}`);
        this.$store.state.docimax.userinfo = res.User || res.data.User;
      } else {
        this.$store.state.docimax.userinfo = JSON.parse(user.profile.sub).User;
      }
      window.sessionStorage.setItem('@docimax/oidc:userinfo', JSON.stringify(this.$store.state.docimax.userinfo));
      this.$router.push('/');
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.oidc-callback {
  font-family: sans-serif;
  height: 100%;
  width: 100%;
}

h3 {
  box-sizing: border-box;
  color: #3d3d3d;
  background-color: #fafafa;
  border-radius: 3px;
}
</style>
