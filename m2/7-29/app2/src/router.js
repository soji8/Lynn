import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from './components/content.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'content',
    component: Content
  }
]

export default routes
