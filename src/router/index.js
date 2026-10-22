import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/IndexView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/user',
      component: () => import('../views/user/UserIndexView.vue'),
      meta: { requiresAuth: true },
      redirect: { name: 'profile' },
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/user/ProfileView.vue')
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('../views/user/CheckoutView.vue')
        },
        {
          path: 'receipt',
          name: 'receipt',
          component: () => import('../views/user/ReceiptView.vue')
        },
      ]
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/featured',
      name: 'featured',
      component: () => import('../views/FeaturedView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue'),
    },
    {
      path: '/category/:id',
      name: 'category',
      component: () => import('../views/CategoriesView.vue'),
    },
  ],
})


router.beforeEach(async (to) => {
  const auth = useAuthStore();
  const isLoggedIn = await auth.checkAuth();

  if (to.matched.some(route => route.meta.requiresAuth) && !isLoggedIn) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  if ((to.name === 'login' || to.name === 'register') && isLoggedIn) return { name: 'index' }
});

export default router
