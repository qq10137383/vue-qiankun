import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/testDemo',
    name: 'TestDemo',
    component: () => import('@/views/test-demo/test'),
  },
  {
    path: '/form/index',
    name: 'Form',
    component: () => import('@/views/form/index')
  },
  {
    path: '/example/table',
    name: 'Table',
    component: () => import('@/views/table/index')
  },
  {
    path: '/example/tree',
    name: 'Tree',
    component: () => import('@/views/tree/index')
  }
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

