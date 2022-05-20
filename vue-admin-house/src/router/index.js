import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/submit/index',
    name: 'Submit',
    component: () => import('@/views/submit/index'),
  },
  {
    path: '/example/article',
    name: 'Article',
    component: () => import('@/views/article/index')
  },
  {
    path: '/example/leaf',
    name: 'Leaf',
    component: () => import('@/views/leaf/index'),
  },
]

let router = null

export function createRouter() {
  router = new Router({
    mode: 'history', // require service support
    base: window.__POWERED_BY_QIANKUN__ ? `/${process.env.VUE_APP_NAME}` : '/',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
  return router
}

export function getRouter() {
  return router
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  if (router) {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }
}

export function disposeRouter() {
  router = null
}

