const state = {
  // 当前激活的微应用
  app: ''
}

const mutations = {
  SET_APP: (state, app) => {
    state.app = app
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
