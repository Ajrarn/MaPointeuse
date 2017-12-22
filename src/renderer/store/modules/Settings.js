import { ipcRenderer } from 'electron'

const state = {
  settings: {
    utilisateur: {
      prenom: '',
      nom: ''
    },
    pointage: {
      maxMatin: 0,
      minApresMidi: 0,
      bonusDebut: 0,
      bonusFin: 0,
      minPauseMediane: 0
    }
  }
}

const mutations = {
  UPDATE_SETTINGS (state, payload) {
    // Object.assign(state, payload)
    state.settings = payload
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
