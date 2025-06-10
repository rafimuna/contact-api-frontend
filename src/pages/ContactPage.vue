<template>
  <q-page padding class="flex flex-center">
    <q-card ref="cardRef" class="q-pa-xl shadow-3" style="width: 100%; max-width: 500px">
      <div class="text-h5 text-primary text-center q-mb-lg">Contact Us</div>
      <q-form @submit.prevent="submitForm" class="q-gutter-md">
        <q-input filled v-model="form.name" label="Your Name" dense />
        <q-input filled v-model="form.email" label="Email" type="email" dense />
        <q-input filled v-model="form.message" label="Message" type="textarea" dense autogrow />
        <q-btn
          label="Send Message"
          type="submit"
          color="primary"
          class="full-width"
          :loading="loading"
          unelevated
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import gsap from 'gsap'
import { api } from 'boot/axios' // your axios instance from boot file

const $q = useQuasar()

const form = ref({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)
const cardRef = ref(null)

const submitForm = async () => {
  loading.value = true
  try {
    await api.post('/contact/create/', form.value)
    $q.notify({
      color: 'positive',
      message: 'Message sent successfully!',
      icon: 'check_circle',
    })
    form.value = { name: '', email: '', message: '' }
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Failed to send message.',
      icon: 'error',
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  gsap.from(cardRef.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  })
})
</script>

<style scoped>
.q-card {
  border-radius: 16px;
}
</style>
