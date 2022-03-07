/**
 * 从基座中store获取的值传给子应用，一定要深拷贝一份为新的数据
 * 否则数据在子应用在重新observe之后，原始数据的dep对象会全部丢失
 * 基座中的依赖此数据的watcher会失去响应性
 */
import { deepClone } from '@/utils'

const EVENT_VISITED_CHANGE = 'visited-views-changed'

const EVENT_CACHED_CHANGE = 'cached-views-changed'

let tagsView

// 对route进行deepClone会导致循环依赖，需要手动深拷贝
function cloneRouteViews(source) {
    return source.map(m => {
        return {
            name: m.name,
            title: m.title,
            path: m.path,
            fullPath: m.fullPath,
            hash: m.hash,
            params: m.params ? deepClone(m.params) : {},
            query: m.query ? deepClone(m.query) : {},
            meta: m.meta ? deepClone(m.meta) : {},
        }
    })
}

export function initTagView(inst) {
    tagsView = inst.$store.state.tagsView
    const emitter = inst.$eventBus

    inst.$watch(() => {
        return tagsView.visitedViews
    }, (val) => {
        emitter.emit(EVENT_VISITED_CHANGE, cloneRouteViews(val))
    })

    inst.$watch(() => {
        return tagsView.cachedViews
    }, (val) => {
        emitter.emit(EVENT_CACHED_CHANGE, deepClone(val))
    })
}

function getTagsView() {
    return deepClone(tagsView)
}

function getVisitedViews() {
    return deepClone(tagsView.visitedViews)
}

function getCachedViews() {
    return deepClone(tagsView.cachedViews)
}

export default {
    EVENT_VISITED_CHANGE,
    EVENT_CACHED_CHANGE,
    getTagsView,
    getVisitedViews,
    getCachedViews,
}