<template>
  <div :id="appId">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appId: process.env.VUE_APP_NAME,
    };
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
  },
  watch: {
    cachedViews(val) {
      let a = window.__mySale;
      debugger;
    },
  },
};
</script>
