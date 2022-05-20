<template>
  <div :id="appId">
    <keep-alive :include="cachedViews">
      <router-view v-if="showView" :key="key" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appId: process.env.VUE_APP_NAME,
      showView: true,
    };
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    refreshKey() {
      return this.$store.state.tagsView.refreshKey;
    },
    key() {
      return this.$route.path;
    },
  },
  watch: {
    // 刷新视图(不改变缓存key)
    refreshKey() {
      this.showView = false;
      this.$nextTick(() => (this.showView = true));
    },
  },
};
</script>
