<!-- pages/AdminDashboard.vue -->
<template>
  <q-page>
    <q-table title="All Users" :rows="users" :columns="columns" row-key="id">
      <template v-slot:body-cell-action="props">
        <q-btn color="red" label="Delete" @click="deleteUser(props.row.id)" />
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const columns = [
  { name: 'username', label: 'Username', field: 'username' },
  { name: 'email', label: 'Email', field: 'email' },
  { name: 'role', label: 'Role', field: 'role' },
  { name: 'action', label: 'Action', field: 'action' },
]

const fetchUsers = async () => {
  const res = await fetch('http://localhost:8000/api/users/')
  users.value = await res.json()
}

const deleteUser = async (id) => {
  await fetch(`http://localhost:8000/api/users/${id}/`, {
    method: 'DELETE',
  })
  fetchUsers()
}

onMounted(fetchUsers)
</script>
