/**
 * 初始化缓存视图，同步缓存视图改变
 * @param {vm} inst 
 */
export function initTagView(inst) {
    const { emitter, tabView } = inst.$mainApp

    function setCachedViews() {
        const views = tabView.getAppCachedViews(process.env.VUE_APP_NAME)
        inst.$store.dispatch('tagsView/setCachedViews', views)
    }

    emitter.on(tabView.EVENT_CACHED_CHANGE, setCachedViews)

    setCachedViews()

    inst.$once('hook:beforeDestroy', () => {
        emitter.off(tagsView.EVENT_CACHED_CHANGE, setCachedViews)
    })
}