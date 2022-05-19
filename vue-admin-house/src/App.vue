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
      cachedViews: ["Submit"],
    };
  },
  created() {
    console.log(window.__myHouse);
    debugger;
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>
