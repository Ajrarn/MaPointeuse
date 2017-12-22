import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import createLogger from 'vuex/dist/logger'

const logger = createLogger({
  collapsed: false, // auto-expand logged mutations
  filter (mutation, stateBefore, stateAfter) {
    // retourne `true` si une mutation devrait être logguée
    // `mutation` est un `{ type, payload }`
    return mutation.type !== 'aBlacklistedMutation'
  },
  transformer (state) {
    // transforme l'état avant de le logguer.
    // retourne par exemple seulement un sous-arbre spécifique
    return state
  },
  mutationTransformer (mutation) {
    // les mutations sont logguées au format `{ type, payload }`
    // nous pouvons les formater comme nous le souhaitons.
    return mutation.type
  },
  logger: console // implementation de l'API `console`, par défaut `console`
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [logger],
  strict: process.env.NODE_ENV !== 'production'
})
