import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import SpreadJS from '../components/SpreadJS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloWord',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'spreadJS',
      component: SpreadJS
    }
  ]
})
