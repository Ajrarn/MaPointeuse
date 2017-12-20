import { ipcRenderer } from 'electron'

const state = {
  name: {
    first: '',
    last: ''
  }
}

const mutations = {
  GET_NAME_RECEIVED (state, payload) {
    state.name = payload
  }
}

const actions = {
  getName ({ commit }) {
    if (ipcRenderer) {
      ipcRenderer.send('getName')
      ipcRenderer.once('getName-reply', (event, data) => {
        commit('GET_NAME_RECEIVED', data)
      })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
