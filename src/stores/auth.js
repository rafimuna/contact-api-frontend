// src/stores/auth.js
import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(payload) {
      try {
        const response = await api.post('/login/', payload)
        const data = response.data

        this.user = data.user
        this.token = data.token

        // Token localStorage-এ রাখছি যাতে রিলোডেও টিকে থাকে
        localStorage.setItem('token', data.token)

        // API default header-এ token সেট করা (optional but useful)
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      } catch (error) {
        console.error('Login failed:', error)
        throw error // উপরের component-এ handle করার জন্য
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    },

    isAdmin() {
      return this.user?.role === 'admin' // backend থেকে 'role' ফিল্ড expect করছি
    },
  },
})
