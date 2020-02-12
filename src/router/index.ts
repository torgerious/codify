import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Editor from "@/views/Editor.vue";
import HtmlCourse from "@/views/tutorials/webdevelopment/html/HtmlCourse.vue";
import CoursePage from "@/components/CoursePage.vue";
import Register from "@/views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'coursepage',
    component: CoursePage
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  },
  {
    path: '/step',
    name: 'step',
    component: HtmlCourse
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
