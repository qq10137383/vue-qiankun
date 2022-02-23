const app = {
  // 微应用名称
  name: 'vue-admin-sale',
  // 开发环境微应用端口号
  devPort: 4000,
  // 生产环境微应用部署地址
  entry: 'http://localhost:4000',
  // 微应用菜单(路由去掉Component)
  menus: [
    {
      path: '/testDemo',
      name: 'TestDemo',
      meta: { title: 'Sale dashboard', icon: 'dashboard' }
    },
    {
      path: '/form',
      redirect: '/form/index',
      children: [
        {
          path: 'index',
          name: 'Form',
          meta: { title: 'Sale Form', icon: 'form' }
        }
      ]
    },
    {
      path: '/example',
      redirect: '/example/table',
      meta: { title: 'Sale Example', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'table',
          name: 'Table',
          meta: { title: 'Sale Table', icon: 'table' }
        },
        {
          path: 'tree',
          name: 'Tree',
          meta: { title: 'Sale Tree', icon: 'tree' }
        }
      ]
    }
  ]
}

export default app
