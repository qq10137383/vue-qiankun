/**
 * 初始化缓存视图，同步缓存视图改变
 * @param {vm} inst 
 */
export function initTagView(inst) {
    const { emitter, tagsView } = inst.$substrate

    function setCachedViews(val) {
        inst.$store.dispatch('tagsView/setCachedViews', val)
    }
    emitter.on(tagsView.EVENT_CACHED_CHANGE, setCachedViews)
    setCachedViews(tagsView.getCachedViews())

    inst.$once('hook:beforeDestroy', () => {
        emitter.off(tagsView.EVENT_CACHED_CHANGE, setCachedViews)
    })
}