const state = {
    cachedViews: [], // 缓存视图
    refreshKey: '', // 视图刷新key，用于视图刷新
}

const mutations = {
    SET_CACHED_VIEWS(state, views) {
        state.cachedViews = views
    },
    REFRESH_VIEW_KEY() {
        state.refreshKey = String(new Date().getTime())
    }
}

const actions = {
    setCachedViews({ commit }, views) {
        commit('SET_CACHED_VIEWS', views)
    },
    refreshViewKey({ commit }) {
        commit('REFRESH_VIEW_KEY')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
