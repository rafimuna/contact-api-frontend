// stores/contact.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useContactStore = defineStore('contact', () => {
  const contacts = ref([]) // ✅ Contact list
  const loading = ref(false) // 🔄 Loading state
  const error = ref(null) // ❌ Error message
  const totalPages = ref(1) // 📄 Total pages for pagination

  // Fetch contacts with search and pagination
  const fetchContacts = async (search = '', page = 1) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('contact/', {
        params: { search, page },
      })

      if (Array.isArray(response.data.results)) {
        contacts.value = response.data.results
        totalPages.value = Math.ceil(response.data.count / 5) // assuming page size = 5
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

  // Edit contact's message with PUT request
  const editContact = async (contact) => {
    const updatedMessage = prompt('Update message:', contact.message)
    if (updatedMessage && updatedMessage !== contact.message) {
      try {
        const payload = { ...contact, message: updatedMessage }
        await api.put(`contact/${contact.id}/`, payload)
        await fetchContacts() // refresh list after update
      } catch (err) {
        error.value = 'Update করতে সমস্যা হয়েছে'
        console.error('Update error:', err)
        alert('Update করতে সমস্যা হয়েছে')
      }
    }
  }

  // Delete contact by id
  const deleteContact = async (id) => {
    try {
      await api.delete(`contact/${id}/`)
      // Remove deleted contact locally without refetching
      contacts.value = contacts.value.filter((c) => c.id !== id)
    } catch (err) {
      error.value = 'ডিলিট করতে সমস্যা হয়েছে'
      console.error('Delete error:', err)
    }
  }

  return {
    contacts,
    loading,
    error,
    totalPages,
    fetchContacts,
    editContact,
    deleteContact,
  }
})
