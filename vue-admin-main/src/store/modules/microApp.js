const state = {
  // 当前激活的微应用
  app: ''
}

const mutations = {
  SET_APP: (state, app) => {
    state.app = app
  }
}

const actions = {
  setApp: ({ commit }, app) => {
    commit('SET_APP', app)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
