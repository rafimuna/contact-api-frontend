// src/boot/axios.js

import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // 👈 Django API base URL
})

export default boot(({ app }) => {
  // globally inject axios & api
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
