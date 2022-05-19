import { deepClone } from '@/utils'
import { Layout, Blank } from '@/layout'
import getAppConfigs from './config'

function parseAppRoute(app, route, parent) {
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
    route.children.forEach(child => parseAppRoute(app, child, route))
  }
}

function getAppRoutes() {
  const config = getAppConfigs()
  const routes = Object.keys(config).reduce((routes, name) => {
    const app = config[name]
    const menus = deepClone(app.menus || [])
    menus.forEach(item => parseAppRoute(app, item))
    routes.push(...menus)
    return routes
  }, [])
  // 404 page
  routes.push({ path: '*', redirect: '/404', hidden: true })
  return routes
}

export default getAppRoutes
