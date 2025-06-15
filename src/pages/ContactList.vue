<template>
  <div class="q-pa-md">
    <!-- 🔰 Title -->
    <div class="text-h5 text-primary q-mb-md flex items-center">
      <q-icon name="contact_mail" class="q-mr-sm" />
      Contact List
    </div>

    <!-- 🔍 Search -->
    <q-input
      outlined
      debounce="500"
      v-model="search"
      placeholder="Search by name/email/message"
      class="q-mb-lg"
      dense
      clearable
      @update:model-value="onSearch"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- 🔄 Loading -->
    <div v-if="contactStore.loading" class="row justify-center q-my-xl">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <!-- ❌ Error -->
    <div v-else-if="contactStore.error" class="text-negative text-center q-mt-md">
      <q-icon name="error_outline" class="q-mr-sm" />
      {{ contactStore.error }}
    </div>

    <!-- ✅ Contact List -->
    <div v-else-if="contactStore.contacts.length" class="q-gutter-md">
      <q-card
        v-for="(contact, index) in contactStore.contacts"
        :key="contact.id"
        class="q-pa-md shadow-2 hover-card"
        :ref="(el) => (contactRefs[index] = el)"
      >
        <q-card-section class="row items-center no-wrap">
          <!-- 🧑 Avatar -->
          <q-avatar size="50px" color="primary" text-color="white">
            {{ contact.name.slice(0, 1).toUpperCase() }}
          </q-avatar>

          <!-- 📝 Info -->
          <div class="q-ml-md">
            <div class="text-subtitle1 text-bold">{{ contact.name }}</div>
            <div class="text-caption text-grey">
              <q-icon name="email" size="16px" class="q-mr-xs" />
              {{ contact.email }}
            </div>
            <div class="text-caption q-mt-xs">
              <q-icon name="access_time" size="16px" class="q-mr-xs" />
              {{ formatDate(contact.created_at) }}
            </div>
          </div>

          <!-- ✏️ Edit/Delete Buttons -->
          <div class="q-ml-auto">
            <q-btn dense flat icon="edit" color="primary" @click="editContact(contact)" round />
            <q-btn
              dense
              flat
              icon="delete"
              color="negative"
              @click="deleteContact(contact.id)"
              round
            />
          </div>
        </q-card-section>

        <!-- 📩 Message -->
        <q-card-section class="q-pt-none">
          {{ contact.message }}
        </q-card-section>
      </q-card>

      <!-- 📄 Pagination -->
      <div class="row justify-center q-mt-lg">
        <q-pagination
          v-model="currentPage"
          :max="contactStore.totalPages"
          :max-pages="5"
          direction-links
          boundary-numbers
          color="primary"
          @update:model-value="onPageChange"
        />
      </div>
    </div>

    <!-- ℹ️ No Result -->
    <div v-else class="text-grey text-center q-mt-md">
      <q-icon name="info" class="q-mr-sm" />
      No contacts found.
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useContactStore } from 'stores/contact'
import gsap from 'gsap'

const contactStore = useContactStore()
const search = ref('')
const currentPage = ref(1)
const contactRefs = ref([])

const fetchData = async () => {
  await contactStore.fetchContacts(search.value, currentPage.value)
  await nextTick()
  animateCards()
}

onMounted(() => {
  fetchData()
})

const onSearch = () => {
  currentPage.value = 1
  fetchData()
}

const onPageChange = () => {
  fetchData()
}

const deleteContact = async (id) => {
  if (confirm('Are you sure to delete this contact?')) {
    await contactStore.deleteContact(id)
    fetchData()
  }
}

const editContact = (contact) => {
  alert(`You clicked Edit on ${contact.name} (functionality pending)`)
}

// 📅 Format timestamp to readable format
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

// 🎞️ GSAP Animate cards
const animateCards = () => {
  gsap.from(contactRefs.value, {
    opacity: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.out',
  })
}
</script>
<style scoped>
.hover-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
</style>
