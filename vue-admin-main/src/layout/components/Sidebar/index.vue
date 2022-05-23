<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div class="side-menu-wrap">
      <appbar />
      <el-scrollbar class="app-menu-wrap" wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            v-for="route in app_routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import Appbar from "./Appbar";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: {
    Appbar,
    SidebarItem,
    Logo,
  },
  computed: {
    ...mapGetters(["app_routes", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
