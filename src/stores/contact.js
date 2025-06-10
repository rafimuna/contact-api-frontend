// stores/contact.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useContactStore = defineStore('contact', () => {
  const contacts = ref([]) // ✅ Contact list
  const loading = ref(false) // 🔄 Loading state
  const error = ref(null) // ❌ Error message

  const fetchContacts = async (search = '', page = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('contact/', {
        params: {
          search,
          page,
        },
      })

      if (Array.isArray(response.data.results)) {
        contacts.value = response.data.results
        totalPages.value = Math.ceil(response.data.count / 5) // Page size = 5
      } else {
        contacts.value = []
        totalPages.value = 1
      }
    } catch (err) {
      error.value = 'Contacts load করতে সমস্যা হয়েছে'
      console.error('Fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  const totalPages = ref(1)

  return {
    contacts,
    loading,
    error,
    totalPages,
    fetchContacts,
  }
})
