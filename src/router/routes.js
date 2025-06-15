import { useAuthStore } from 'src/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') },
      { path: 'contacts', name: 'contact-list', component: () => import('pages/ContactList.vue') },

      // ✅ Register Page
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },

      // ✅ Login Page
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },

      // ✅ Admin Dashboard with route guard
      {
        path: 'admin-dashboard',
        name: 'admin-dashboard',
        component: () => import('pages/AdminDashboard.vue'),
        beforeEnter: (to, from, next) => {
          const auth = useAuthStore()
          if (auth.user && auth.user.role === 'admin') {
            next()
          } else {
            next('/login')
          }
        },
      },
    ],
  },

  // ❗ fallback route
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
