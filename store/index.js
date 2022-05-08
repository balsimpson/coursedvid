const mutations = {
  setUser(state, val) {
    state.user = val;
  },
  setAdmin(state, val) {
    state.isAdmin = val;
  },
  setUserName(state, val) {
    state.user.displayName = val;
  },
  setUserImage(state, val) {
    state.user.photoURL = val;
  },
  setLists(state, val) {
    state.lists = val;
  }
},
  actions = {},
  getters = {};

const state = () => (
  {
    user: null,
    isAdmin: false,
    lists: []
  }
)

export default {
  state,
  mutations,
  actions,
  getters
}