import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/test',
      name: 'test-page',
      component: require('@/components/TestPage').default
    },
    {
      path: '/principale',
      name: 'page-principale',
      component: require('@/components/PagePrincipale').default,
      children: [
        {
          path: 'preferences',
          component: require('@/components/PagePrincipaleComponents/PagePreferences').default
        },
        {
          path: '',
          component: require('@/components/PagePrincipaleComponents/PagePointage').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
