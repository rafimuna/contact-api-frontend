<template>
  <q-page class="flex flex-center">
    <q-card
      ref="cardRef"
      class="q-pa-lg shadow-2 rounded-borders animate-card"
      style="width: 100%; max-width: 450px"
    >
      <!-- Title -->
      <q-card-section>
        <div class="text-h5 text-primary text-center">Register</div>
      </q-card-section>

      <!-- Register Form -->
      <q-form @submit.prevent="handleRegister" class="q-gutter-md">
        <!-- Username -->
        <q-input
          v-model="form.username"
          label="Username"
          outlined
          dense
          class="hover-effect"
          :rules="[(val) => !!val || 'Username is required']"
        />

        <!-- Email -->
        <q-input
          v-model="form.email"
          label="Email"
          type="email"
          outlined
          dense
          class="hover-effect"
          :rules="[
            (val) => !!val || 'Email is required',
            (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format',
          ]"
        />

        <!-- Phone -->
        <q-input
          v-model="form.phone"
          label="Phone Number"
          type="tel"
          outlined
          dense
          class="hover-effect"
          :rules="[
            (val) => !!val || 'Phone number is required',
            (val) => /^\d{10,15}$/.test(val) || 'Enter a valid phone number',
          ]"
        />

        <!-- Gender -->
        <div>
          <label class="text-subtitle2 text-grey-8">Gender</label>
          <q-option-group
            v-model="form.gender"
            :options="genderOptions"
            type="radio"
            inline
            class="q-mt-sm"
            :rules="[(val) => !!val || 'Please select a gender']"
          />
        </div>

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

        <!-- Register Button -->
        <q-btn label="Register" type="submit" color="primary" class="full-width hover-btn" />
      </q-form>

      <!-- Already Registered -->
      <q-card-section class="q-pt-none text-center">
        <q-btn flat to="/login" label="Already have an account? Login" size="sm" color="primary" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import gsap from 'gsap'

const form = ref({
  username: '',
  email: '',
  phone: '',
  gender: '',
  password: '',
})

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
]

// GSAP Animation on Card Mount
const cardRef = ref(null)
onMounted(() => {
  gsap.from(cardRef.value.$el, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
  })
})

const handleRegister = async () => {
  try {
    const response = await api.post('/register/', form.value)
    alert('Registered successfully!')
    console.log(response.data)
  } catch (error) {
    console.error('Registration error:', error)
    alert('Registration failed. Please try again.')
  }
}
</script>

<style scoped>
/* Hover effects for input fields */
.hover-effect input {
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}
.hover-effect:hover input {
  border-color: #1976d2 !important;
  box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
}

/* Hover effects for button */
.hover-btn {
  transition:
    transform 0.2s ease,
    background-color 0.3s ease;
}
.hover-btn:hover {
  transform: scale(1.05);
  background-color: #1565c0 !important;
}

/* Card animation */
.animate-card {
  transition: all 0.3s ease;
}
</style>
