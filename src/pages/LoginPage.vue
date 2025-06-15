<template>
  <q-page class="flex flex-center">
    <q-card
      ref="cardRef"
      class="q-pa-lg shadow-2 rounded-borders animate-card"
      style="width: 100%; max-width: 400px"
    >
      <!-- Title -->
      <q-card-section>
        <div class="text-h6 text-primary text-center">Login</div>
      </q-card-section>

      <!-- Login Form -->
      <q-form @submit.prevent="handleLogin" class="q-gutter-md">
        <!-- Username -->
        <q-input
          v-model="form.username"
          label="Username"
          outlined
          dense
          class="hover-effect"
          :rules="[(val) => !!val || 'Username is required']"
        />

        <!-- Password -->
        <q-input
          v-model="form.password"
          label="Password"
          type="password"
          outlined
          dense
          class="hover-effect"
          :rules="[(val) => !!val || 'Password is required']"
        />

        <!-- Login Button -->
        <q-btn label="Login" type="submit" color="primary" class="full-width hover-btn" />
      </q-form>

      <!-- Redirect to Register -->
      <q-card-section class="q-pt-none text-center">
        <q-btn
          flat
          to="/register"
          label="Don't have an account? Register"
          size="sm"
          color="primary"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import gsap from 'gsap'

const form = ref({ username: '', password: '' })
const router = useRouter()
const auth = useAuthStore()

const cardRef = ref(null)

// Animate login card on mount
onMounted(() => {
  gsap.from(cardRef.value.$el, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
  })
})

const handleLogin = async () => {
  try {
    await auth.login(form.value)
    router.push('/') // অথবা 'admin-dashboard'
  } catch {
    alert('Login failed. Please check your credentials.')
  }
}
</script>

<style scoped>
/* Hover effects for inputs */
.hover-effect input {
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}
.hover-effect:hover input {
  border-color: #1976d2 !important;
  box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
}

/* Hover effect for button */
.hover-btn {
  transition:
    transform 0.2s ease,
    background-color 0.3s ease;
}
.hover-btn:hover {
  transform: scale(1.05);
  background-color: #1565c0 !important;
}

/* Animation class */
.animate-card {
  transition: all 0.3s ease;
}
</style>
