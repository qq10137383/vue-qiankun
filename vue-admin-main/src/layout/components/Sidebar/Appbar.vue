<template>
  <el-scrollbar class="appbar-wrap" wrap-class="scrollbar-wrapper">
    <div class="appbar-list">
      <div
        v-for="item in apps"
        :key="item.name"
        :class="[
          'appbar-item',
          {
            actived: item.name === activeApp,
          },
        ]"
        @click="setApp(item)"
      >
        <svg-icon :icon-class="item.icon" />
        <div>{{ item.title }}</div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import config from "@/micro-apps/config";

/**
 * 子系统导航栏
 */
export default {
  name: "Appbar",
  data() {
    return {
      activeApp: "",
      apps: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.apps = Object.values(config);
      if (this.apps.length > 0) {
        this.setApp(this.apps[0]);
      }
    },
    setApp(item) {
      this.activeApp = item.name;
      this.$store.commit("microApp/SET_APP", item.name);
      this.$emit("app-changed", item);
    },
  },
};
</script>