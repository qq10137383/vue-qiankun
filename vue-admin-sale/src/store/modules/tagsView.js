const state = {
    cachedViews: []
}

const mutations = {
    SET_CACHED_VIEWS(state, views) {
        state.cachedViews = views
    }
}

const actions = {
    setCachedViews({ commit }, views) {
        commit('SET_CACHED_VIEWS', views)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
