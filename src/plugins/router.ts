import { createRouter, createWebHistory, type RouteRecordNameGeneric } from 'vue-router'
import LoginView from '@/views/LoginView.vue'

export const authenticatedRoutes = ['home']

export const isAuthenticatedRoute = (route: RouteRecordNameGeneric) => {
  const routeValue = route?.toString()
  if (typeof routeValue === 'string') {
    console.log(routeValue)
    return authenticatedRoutes.includes(routeValue)
  } else {
    return false
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue'),
    },
  ],
})

export default router
