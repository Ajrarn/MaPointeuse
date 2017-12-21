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
  getSetting ({ commit }) {
    if (ipcRenderer) {
      ipcRenderer.send('getSetting')
      ipcRenderer.once('getSetting-reply', (event, data) => {
        commit('GET_NAME_RECEIVED', data)
      })
    }
  },
  setSetting ({ commit }, payload) {
    if (ipcRenderer) {
      ipcRenderer.send('setSetting', payload)
      ipcRenderer.once('setSetting-reply', () => {
        commit('GET_NAME_RECEIVED', payload)
      })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
