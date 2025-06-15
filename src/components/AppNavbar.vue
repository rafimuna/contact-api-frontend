<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat to="/" class="text-white"> ContactApp </q-btn>
      </q-toolbar-title>

      <!-- Common Links -->
      <q-btn flat to="/" label="Home" class="q-mr-sm text-white" />
      <q-btn flat to="/contact" label="Contact" class="text-white" />
      <q-btn flat label="Contact list" to="/contacts" />

      <!-- Conditional Buttons -->
      <q-btn
        v-if="auth.user?.role === 'admin'"
        to="/admin-dashboard"
        label="Admin"
        class="text-white"
      />

      <q-btn v-if="!auth.user" flat to="/login" label="Login" class="text-white" />
      <q-btn v-if="!auth.user" flat to="/register" label="Register" class="text-white" />
      <q-btn v-if="auth.user" flat label="Logout" class="text-white" @click="logout" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>
