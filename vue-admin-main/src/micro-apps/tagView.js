const EVENT_VISITED_CHANGE = 'visited-views-changed'
const EVENT_CACHED_CHANGE = 'cached-views-changed'

let tagsView

export function initTagView(inst) {
    tagsView = inst.$store.state.tagsView
    const emitter = inst.$eventBus

    inst.$watch(() => {
        return tagsView.visitedViews
    }, (val) => {
        emitter.emit(EVENT_VISITED_CHANGE, val)
    })

    inst.$watch(() => {
        return tagsView.cachedViews
    }, (val) => {
        emitter.emit(EVENT_CACHED_CHANGE, val)
    })
}

function getTagsView() {
    return tagsView
}

function getVisitedViews() {
    return tagsView.visitedViews
}

function getCachedViews() {
    return tagsView.cachedViews
}

export default {
    EVENT_VISITED_CHANGE,
    EVENT_CACHED_CHANGE,
    getTagsView,
    getVisitedViews,
    getCachedViews,
}