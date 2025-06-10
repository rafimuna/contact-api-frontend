<template>
  <q-layout view="hHh lpR fFf">
    <!-- ✅ Navbar added here -->
    <AppNavbar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppNavbar from 'components/AppNavbar.vue' // ✅ import the component
</script>
