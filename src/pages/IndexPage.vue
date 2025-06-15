<template>
  <q-page class="home-page">
    <div class="q-container column items-center justify-center text-center full-height">
      <!-- ✅ Professional Contact Logo -->
      <img
        ref="logo"
        src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png"
        alt="Contact Management Icon"
        class="logo-image"
      />

      <!-- ✅ Heading -->
      <div class="text-h4 text-white q-mt-md text-weight-bold">Contact Management System</div>

      <!-- ✅ Subtext -->
      <div class="text-subtitle2 text-grey-4 q-mt-sm">
        Efficiently manage, edit & delete user contacts
      </div>

      <!-- ✅ CTA Button -->
      <q-btn
        label="Manage Contacts"
        color="primary"
        class="q-mt-lg"
        glossy
        unelevated
        icon="contacts"
        @click="goToNextPage"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { useRouter } from 'vue-router'

const logo = ref(null)
const router = useRouter()

onMounted(() => {
  // 🔄 Animate logo on load
  gsap.from(logo.value, {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: 'power2.out',
  })
})

// 🔁 Go to contact list page
const goToNextPage = () => {
  router.push('/contacts') // ✅ রাউট বদলাও তোমার অ্যাপ অনুযায়ী
}
</script>

<style scoped>
.home-page {
  background: linear-gradient(135deg, #1d1d1d, #3a3a3a);
  animation: bgFade 10s ease infinite alternate;
}

.logo-image {
  width: 150px;
  height: 150px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
}

@keyframes bgFade {
  0% {
    background: linear-gradient(135deg, #1d1d1d, #3a3a3a);
  }
  100% {
    background: linear-gradient(135deg, #0f2027, #2c5364);
  }
}
</style>
