import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { Blank } from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/testDemo',
    name: 'TestDemo',
    component: () => import('@/views/test-demo/test'),
    meta: { title: 'Sale dashboard', icon: 'dashboard' }
  },
  {
    path: '/form',
    redirect: '/form/index',
    component: Blank,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Sale Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/example',
    redirect: '/example/table',
    component: Blank,
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Sale Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Sale Tree', icon: 'tree' }
      }
    ]
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

