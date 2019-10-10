<template>
  <div class="oidc-callback">
    <h1>oidc callback.</h1>
  </div>
</template>

<script>
export default {
  name: 'do-cb',
  created () {
    this.$usermanager.signinRedirectCallback()
      .then(user => {
        this.$userinfo = user
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>
