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
    path: '/submit',
    component: Blank,
    redirect: '/submit/index',
    children: [
      {
        path: 'index',
        name: 'Submit',
        component: () => import('@/views/submit/index'),
        meta: { title: 'House Submit', icon: 'form' }
      }
    ]
  },
  {
    path: '/example',
    component: Blank,
    redirect: '/example/article',
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/article/index'),
        meta: { title: 'House Article', icon: 'table' }
      },
      {
        path: 'leaf',
        name: 'Leaf',
        component: () => import('@/views/leaf/index'),
        meta: { title: 'House Leaf', icon: 'table' }
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

