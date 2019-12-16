const user = {
  state: {
    customerId: ''
  },
  mutations: {
    CUSTOMER_ID: (state, data) => {
      state.customerId = data
    }
  },
  actions: {
    updateCustomerId({ commit }, data) {
      commit('CUSTOMER_ID', data)
    }
  }
}
export default user
