<template>
  <div class="q-pa-md">
    <h2 class="text-h5 q-mb-md">📒 Contact List</h2>

    <!-- ✅ Search Input -->
    <q-input
      outlined
      debounce="500"
      v-model="search"
      placeholder="🔍 Search by name/email/message"
      class="q-mb-md"
      @update:model-value="onSearch"
    />

    <!-- 🔄 Loading Spinner -->
    <div v-if="contactStore.loading">
      <q-spinner-dots color="primary" size="40px" />
      Loading...
    </div>

    <!-- ❌ Error -->
    <div v-else-if="contactStore.error" class="text-negative q-mt-md">
      {{ contactStore.error }}
    </div>

    <!-- ✅ Contact List -->
    <div v-else-if="contactStore.contacts.length">
      <q-list bordered separator>
        <q-item
          v-for="contact in contactStore.contacts"
          :key="contact.id"
          clickable
          class="q-pa-sm"
        >
          <q-item-section>
            <div><strong>Name:</strong> {{ contact.name }}</div>
            <div><strong>Email:</strong> {{ contact.email }}</div>
            <div><strong>Message:</strong> {{ contact.message }}</div>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- 📄 Pagination -->
      <q-pagination
        v-model="currentPage"
        :max="contactStore.totalPages"
        :max-pages="5"
        direction-links
        class="q-mt-lg"
        @update:model-value="onPageChange"
      />
    </div>

    <!-- ℹ️ No results -->
    <div v-else class="text-grey q-mt-md">No contacts found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useContactStore } from 'stores/contact'

const contactStore = useContactStore()
const search = ref('')
const currentPage = ref(1)

const fetchData = () => {
  contactStore.fetchContacts(search.value, currentPage.value)
}

onMounted(() => {
  fetchData()
})

// 🔍 Search change
const onSearch = () => {
  currentPage.value = 1
  fetchData()
}

// 📄 Page change
const onPageChange = () => {
  fetchData()
}
</script>
