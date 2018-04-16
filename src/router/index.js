import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../components/recommend/recommend.vue'
import singer from '../components/singer/singer.vue'
import charts from '../components/charts/charts.vue'
import search from '../components/search/search.vue'
import singerDetail from '../components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/charts',
      component: charts
    },
    {
      path: '/search',
      component: search
    }
  ]
})
