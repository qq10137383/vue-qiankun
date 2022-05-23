import { deepClone } from '@/utils'
import { Layout, Blank } from '@/layout'
import config from './config'

/**
 * 转换微应用路由
 * @param {Object} app 
 * @param {Object} route 
 * @param {Object} parent 
 */
function parseRoute(app, route, parent) {
  const meta = route.meta || (route.meta = {})
  const origin = meta.origin = {}
  meta.appName = app.name
  origin.path = route.path
  origin.name = route.name
  route.component = parent ? Blank : Layout
  if (route.name) {
    route.name = `${app.name}#${route.name}`
  }
  if (route.path.startsWith('/')) {
    route.path = `/${app.name}${route.path}`
  }
  if (route.redirect && route.redirect !== 'noRedirect') {
    origin.redirect = route.redirect
    route.redirect = `/${app.name}${route.redirect}`
  }
  if (route.children) {
    route.children.forEach(child => parseRoute(app, child, route))
  }
}

/**
 * 获取微应用路由
 * @returns 
 */
export function getRoutes() {
  const routes = Object.keys(config).reduce((routes, name) => {
    const app = config[name]
    const menus = deepClone(app.menus || [])
    menus.forEach(item => parseRoute(app, item))
    routes.push(...menus)
    return routes
  }, [])
  // 404 page
  routes.push({ path: '*', redirect: '/404', hidden: true })
  return routes
}

/**
 * 拷贝路由
 * 对route进行deepClone会导致循环依赖，需要手动深拷贝
 * @param {Object} route 
 * @returns 
 */
export function cloneRoute(route) {
  return {
    name: route.name,
    title: route.title,
    path: route.path,
    fullPath: route.fullPath,
    hash: route.hash,
    params: route.params ? deepClone(route.params) : {},
    query: route.query ? deepClone(route.query) : {},
    meta: route.meta ? deepClone(route.meta) : {},
  }
}

/**
* 从路由中解析应用名(基座返回空，子应用从meta中解析)
* @param {Object} route 
*/
export function getAppNameFromRoute(route) {
  let tmp = route
  return (tmp = tmp.meta) && (tmp = tmp.appName) || ''
}

/**
 * 过滤微应用路由
 * @param {String} appName 应用名
 * @param {Array} routes 路由集合
 */
export function filterAppRoutes(appName, routes) {
  let appRoutes = []
  if (appName) {
    appRoutes = routes.filter(m => getAppNameFromRoute(m) === appName)
  }
  return appRoutes
}