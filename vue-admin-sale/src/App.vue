<template>
  <div :id="appId">
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
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
    key() {
      return this.$route.path;
    },
  },
  watch: {
    cachedViews(val) {
      debugger
    }
  }
};
</script>
