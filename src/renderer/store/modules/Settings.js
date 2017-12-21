import { ipcRenderer } from 'electron'

const state = {
  name: {
    first: '',
    last: ''
  }
}

const mutations = {
  UPDATE_SETTINGS (state, payload) {
    state = payload
  }
}

const actions = {
  getSetting ({ commit }) {
    if (ipcRenderer) {
      ipcRenderer.send('getSetting')
      ipcRenderer.once('getSetting-reply', (event, data) => {
        commit('UPDATE_SETTINGS', data)
      })
    }
  },
  setSetting ({ commit }, payload) {
    if (ipcRenderer) {
      ipcRenderer.send('setSetting', payload)
      ipcRenderer.once('setSetting-reply', () => {
        commit('UPDATE_SETTINGS', payload)
      })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
