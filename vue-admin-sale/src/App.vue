<template>
  <div :id="appId">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      appId: process.env.VUE_APP_NAME
    }
  }
}
</script>
