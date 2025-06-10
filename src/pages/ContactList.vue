<!-- src/pages/ContactList.vue -->
<script setup>
import { onMounted } from 'vue'
import { useContactStore } from 'stores/contact'

const contactStore = useContactStore()

onMounted(() => {
  contactStore.fetchContacts()
})
</script>

<template>
  <div class="q-pa-md">
    <h2 class="text-h5 q-mb-md">📒 contact list</h2>

    <div v-if="contactStore.loading">its loading...</div>
    <div v-else-if="contactStore.error" class="text-red">
      {{ contactStore.error }}
    </div>
    <ul v-else>
      <li v-for="contact in contactStore.contacts" :key="contact.id" class="q-mb-sm">
        <q-card class="q-pa-sm">
          <div><strong>Name:</strong> {{ contact.name }}</div>
          <div><strong>Email:</strong> {{ contact.email }}</div>
          <div><strong>Message:</strong> {{ contact.message }}</div>
        </q-card>
      </li>
    </ul>
  </div>
</template>
