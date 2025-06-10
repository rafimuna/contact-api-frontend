<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <!-- Logo -->
      <q-toolbar-title>
        <q-btn flat to="/" class="text-white"> ContactApp </q-btn>
      </q-toolbar-title>

      <!-- Links -->
      <q-btn flat to="/" label="Home" class="q-mr-sm text-white" />
      <q-btn flat to="/contact" label="Contact" class="text-white" />
      <q-btn flat label="Contact list" to="/contacts" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
// এখানে কিছু script দরকার নেই যদি লজিক না থাকে
</script>
