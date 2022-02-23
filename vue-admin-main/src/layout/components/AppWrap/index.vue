<template>
  <div id="micro-app-wrap">
    <div v-for="app in apps" :id="`${app.name}-wrap`" :key="app.name" />
  </div>
</template>

<script>
import { getRegisterConfig } from '@/micro-apps/register'

/**
 * 生成微应用宿主容器
 */
export default {
  name: 'AppWrap',
  data() {
    return {
      apps: getRegisterConfig()
    }
  }
}
</script>
