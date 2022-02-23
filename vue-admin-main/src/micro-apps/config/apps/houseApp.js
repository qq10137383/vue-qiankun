const app = {
  // 微应用名称
  name: 'vue-admin-house',
  // 开发环境微应用端口号
  devPort: 4100,
  // 生产环境微应用部署地址
  entry: 'http://localhost:4100',
  // 微应用菜单(路由去掉Component)
  menus: [
    {
      path: '/submit',
      redirect: '/submit/index',
      children: [
        {
          path: 'index',
          name: 'Submit',
          meta: { title: 'House Submit', icon: 'form' }
        }
      ]
    },
    {
      path: '/example',
      redirect: '/example/article',
      meta: { title: 'House Example', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'article',
          name: 'Article',
          meta: { title: 'House Article', icon: 'table' }
        },
        {
          path: 'leaf',
          name: 'Leaf',
          meta: { title: 'House Leaf', icon: 'tree' }
        }
      ]
    }
  ]
}

export default app
