import './public-path'
import Vue from 'vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import App from './App'
import store from './store'
import { createRouter, disposeRouter } from './router'

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

let instance = null

function render({ container } = {}) {
  if (instance) return
  const appName = `#${process.env.VUE_APP_NAME}`
  const el = container ? container.querySelector(appName) : appName
  const router = createRouter()
  instance = new Vue({
    el,
    router,
    store,
    render: h => h(App)
  })
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  window.__myHouse = 'House'
  console.log('vue-admin-house bootstraped')
}

export async function mount(props) {
  console.log('vue-admin-house mount')
  render(props)
}

export async function unmount() {
  console.log('vue-admin-house unmount')
  // instance.$destroy()
  // instance.$el.innerHTML = ''
  // instance = null
  // disposeRouter()
}
