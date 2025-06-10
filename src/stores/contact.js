// stores/contact.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios' // ✅ Quasar boot file থেকে configured axios instance

export const useContactStore = defineStore('contact', () => {
  // ✨ State
  const contacts = ref([]) // সব contacts এখানে array আকারে থাকবে
  const loading = ref(false) // লোডিং স্টেট
  const error = ref(null) // error message

  // ✅ Contacts fetch করার ফাংশন
  const fetchContacts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('contact/') // 🔗 API call

      // ⚠️ Backend যদি object ফরম্যাটে ডেটা দেয় (e.g. { "1": {...}, "2": {...} })
      // তাহলে আমরা সেটাকে array তে রূপান্তর করবো
      const dataObject = response.data
      contacts.value = Object.values(dataObject)

      // ✅ এখন contacts.value হল array: [ {...}, {...}, ... ]
    } catch (err) {
      error.value = 'Contacts load করতে সমস্যা হয়েছে'
      console.error('Contact Fetch Error:', err)
    } finally {
      loading.value = false
    }
  }

  // 🔁 রিটার্ন করছি state এবং ফাংশন
  return {
    contacts,
    loading,
    error,
    fetchContacts,
  }
})
