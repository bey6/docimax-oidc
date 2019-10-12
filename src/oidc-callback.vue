<template>
  <div class="oidc-callback">
    <h1>oidc callback.</h1>
    <pre>{{claim}}</pre>
  </div>
</template>

<script>
const TOOLONG = 'Too long to trans!'

export default {
  name: 'do-cb',
  data: () => ({
    claim: {}
  }),
  async created () {
    try {
      // 对应
      const user = await this.$um.signinRedirectCallback()
      this.claim = user
      if (user.profile.sub === TOOLONG) {
        const res = await this.$axios.get(`${this.$authUrl}/Account/GetPermission/${user.profile.idp.toString().trim()}`)
        this.$store.state.docimax.userinfo = res.data.User
      } else {
        this.$store.state.docimax.userinfo = JSON.parse(user.profile.sub).User
      }
      window.sessionStorage.setItem('@docimax/oidc:userinfo', JSON.stringify(this.$store.state.docimax.userinfo))
      this.$router.push('/')
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style scoped>
.oidc-callback {
  font-family: sans-serif;
}
pre {
  font-size: 12px;
}
</style>
