<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view v-if="showView" :key="key" />
      </keep-alive>
    </transition>
    <app-wrap />
  </section>
</template>

<script>
import { startApps } from "@/micro-apps";
import AppWrap from "./AppWrap";

export default {
  name: "AppMain",
  components: {
    AppWrap,
  },
  data() {
    return {
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
  mounted() {
    // 子应用挂载dom(microApp)初始化完成后启动qiankun，否则子应用加载会报错
    startApps();
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
