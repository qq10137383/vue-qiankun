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

    function refreshView(view) {
        if (tabView.isAppView(process.env.VUE_APP_NAME, view)) {
            inst.$store.dispatch('tagsView/refreshViewKey')
        }
    }

    emitter.on(tabView.EVENT_CACHED_CHANGE, setCachedViews)
    emitter.on(tabView.EVENT_REFRESH_VIEW, refreshView)

    setCachedViews()

    inst.$once('hook:beforeDestroy', () => {
        emitter.off(tabView.EVENT_CACHED_CHANGE, setCachedViews)
        emitter.on(tabView.EVENT_REFRESH_VIEW, refreshView)
    })
}