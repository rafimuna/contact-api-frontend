<template>
  <q-page class="home-page">
    <div class="q-container column items-center justify-center text-center full-height">
      <!-- ✅ Logo with animation -->
      <img ref="logo" alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" class="logo-image" />

      <!-- ✅ Heading -->
      <div class="text-h4 text-white q-mt-md text-weight-bold">Welcome to Quasar Project</div>

      <!-- ✅ Subtext -->
      <div class="text-subtitle2 text-grey-3 q-mt-sm">
        Build blazing-fast Vue.js apps with elegant UI
      </div>

      <!-- ✅ CTA Button -->
      <q-btn
        label="Get Started"
        color="primary"
        class="q-mt-lg"
        glossy
        unelevated
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
  // 🔄 GSAP animation on logo
  gsap.from(logo.value, {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: 'power2.out',
  })
})

// 🔁 Navigate on button click
const goToNextPage = () => {
  router.push('/register') // Change this route as needed
}
</script>

<style scoped>
.home-page {
  background: linear-gradient(135deg, #1d1d1d, #3a3a3a);
  animation: bgFade 10s ease infinite alternate;
}

.logo-image {
  width: 160px;
  height: 160px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
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
