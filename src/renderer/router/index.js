import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'page-principale',
      component: require('@/components/PagePrincipale').default,
      children: [
        {
          path: 'preferences',
          component: require('@/components/PagePrincipaleComponents/PagePreferences').default
        },
        {
          path: 'pointage',
          component: require('@/components/PagePrincipaleComponents/PagePointage').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/pointage'
    }
  ]
})
