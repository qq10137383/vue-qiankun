/**
 * 从基座中store获取的值传给子应用，一定要深拷贝一份为新的数据
 * 否则数据在子应用在重新observe之后，原始数据的dep对象会全部丢失
 * 基座中的依赖此数据的watcher会失去响应性
 */
import { deepClone } from '@/utils'
import { cloneRoute, getAppNameFromRoute } from './router'
import emitter from './emitter'

// 打开页签事件
const EVENT_OPEN_VIEW = 'tabview-open'
// 刷新页签事件
const EVENT_REFRESH_VIEW = 'tabview-refresh'
// 关闭页签事件
const EVENT_CLOSE_VIEW = 'tabview-close'
// 关闭其他页签事件
const EVENT_CLOSE_OTHERS_VIEW = 'tabview-close-others'
// 关闭所有页签事件
const EVENT_CLOSE_ALL_VIEW = 'tabview-close-all'
// 页签改变事件
const EVENT_VISITED_CHANGE = 'tabview-visited-changed'
// 缓存页签改变事件
const EVENT_CACHED_CHANGE = 'tabview-cached-changed'

let vueInst  // vue实例
let tagsView // 页签store

/**
 * 初始化页签
 * @param {Vue} inst vue实例
 */
export function initTabView(inst) {
    vueInst = inst
    tagsView = inst.$store.state.tagsView

    inst.$watch(() => {
        return tagsView.visitedViews
    }, (val) => {
        const views = val.map(m => cloneRoute(m))
        emitter.emit(EVENT_VISITED_CHANGE, views)
    })

    inst.$watch(() => {
        return tagsView.cachedViews
    }, (val) => {
        emitter.emit(EVENT_CACHED_CHANGE, deepClone(val))
    })
}

/**
 * 事件调用(内部使用)
 * @param {String} eventName 事件名 
 * @param {any} args 事件参数
 */
function invokeEvent(eventName, args) {
    let result
    if (Array.isArray(args)) {
        result = args.map(m => cloneRoute(m))
    }
    else {
        result = cloneRoute(args)
    }
    emitter.emit(eventName, result)
}

/**
 * 获取所有页签
 * @returns 
 */
function getVisitedViews() {
    return tagsView.visitedViews.map(m => cloneRoute(m))
}

/**
 * 视图是否属于某微应用
 * @param {String} appName 
 * @param {string} view 
 * @returns 
 */
function isAppView(appName, view) {
    return getAppNameFromRoute(view) === appName
}

/**
 * 获取某微应用所有页签
 * @param {string} appName 微应用名
 */
function getAppVisitedViews(appName) {
    return getVisitedViews().filter(m => isAppView(appName, m))
}

/**
 * 获取所有缓存页签
 * @returns 
 */
function getCachedViews() {
    return deepClone(tagsView.cachedViews)
}

/**
 * 获取某微应用所有缓存页签
 * @param {string} appName 微应用名
 */
function getAppCachedViews(appName) {
    let views = getCachedViews()
    views = views.reduce((result, m) => {
        const segs = m.split('#')
        if (segs.length === 2 && segs[0] === appName) {
            result.push(segs[1])
        }
        return result
    }, [])
    return views;
}

/**
 * 转换路由路径
 * @param {Object} options 
 * -- options.appName {String} 微应用名称，如果为空则是基座页签
 * -- options.path {String} 基座或微应用页签路径
 */
function _resolveViewPath(options) {
    let path = options.path
    if (options.appName) {
        path = `/${options.appName}${path}`
    }
    return path
}

/**
 * 跳转到最后一个页签
 */
function _toLastView() {
    const latestView = tagsView.visitedViews.slice(-1)[0];
    if (latestView) {
        vueInst.$router.push(latestView.fullPath);
    } else {
        vueInst.$router.push("/");
    }
}

/**
 * 打开页签
 * @param {Object} options
 * -- options.appName {String} 微应用名称，如果为空则打开基座页签
 * -- options.path {String} 基座或微应用页签路径
 * -- options.params {Object} 路由路径参数
 * -- options.query {Object} 路由查询参数
 */
function openView(options) {
    return new Promise((resolve, reject) => {
        options.path = _resolveViewPath(options)
        vueInst.$router.push(options, (route) => {
            resolve(route)
        }, (error) => {
            reject(error)
        })
    })
}

/**
 * 关闭页签
 * @param {Object} options 
 * -- options.appName {String} 微应用名称，如果为空则关闭基座页签
 * -- options.path {String} 基座或微应用页签全路径(包括路径参数和查询参数)
 */
function closeView(options) {
    return new Promise((resolve, reject) => {
        let path = _resolveViewPath(options)
        const view = tagsView.visitedViews.find(m => m.path === path)
        if (!view) {
            reject(`closeView error，${path} is not found！`)
            return
        }
        vueInst.$store.dispatch('tagsView/delView', view).then(() => {
            _toLastView()
            resolve(cloneRoute(view))
        })
    })
}

/**
 * 关闭当前页签
 */
async function closeCurrentView() {
    return new Promise((resolve) => {
        vueInst.$store.dispatch('tagsView/delView', vueInst.$route)
            .then(() => {
                _toLastView()
                resolve(cloneRoute(vueInst.$route))
            });
    })
}

/**
 * 刷新页签
 * @param {Object} options 
 * -- options.appName {String} 微应用名称，如果为空则关闭基座页签
 * -- options.path {String} 基座或微应用页签全路径(包括路径参数和查询参数)
 */
function refreshView(options) {
    return new Promise((resolve, reject) => {
        let path = _resolveViewPath(options)
        const view = tagsView.visitedViews.find(m => m.path === path)
        if (!view) {
            reject(`refreshView error，${path} is not found！`)
            return
        }
        vueInst.$store.dispatch('tagsView/refreshView', view).then(() => {
            resolve(cloneRoute(view))
        })
    })
}

/**
 * 刷新当前视图
 * @returns 
 */
function refreshCurrentView() {
    return new Promise((resolve) => {
        vueInst.$store.dispatch('tagsView/refreshView', vueInst.$route).then(() => {
            resolve(cloneRoute(vueInst.$route))
        })
    })
}

export default {
    EVENT_OPEN_VIEW,
    EVENT_REFRESH_VIEW,
    EVENT_CLOSE_VIEW,
    EVENT_CLOSE_OTHERS_VIEW,
    EVENT_CLOSE_ALL_VIEW,
    EVENT_VISITED_CHANGE,
    EVENT_CACHED_CHANGE,
    invokeEvent,
    isAppView,
    getVisitedViews,
    getAppVisitedViews,
    getCachedViews,
    getAppCachedViews,
    openView,
    closeView,
    closeCurrentView,
    refreshView,
    refreshCurrentView
}