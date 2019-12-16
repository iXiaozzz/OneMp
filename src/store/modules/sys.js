const sys = {
  state: {
    mainWrapHeight: ''
  },
  mutations: {
    UPDATE_MAIN_WRAP_HEIGHT: (state, data) => {
      state.mainWrapHeight = data
      console.log(state.mainWrapHeight)
    }
  },
  actions: {
    updateMainWrapHeight({ commit }, data) {
      commit('UPDATE_MAIN_WRAP_HEIGHT', data)
    }
  }
}
export default sys
