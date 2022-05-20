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

let tagsView

/**
 * 初始化页签
 * @param {Vue} inst vue实例
 */
export function initTabView(inst) {
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
    getAppCachedViews
}