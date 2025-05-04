import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { VITE_API_URL } = getEnvVariables()

const productApi = axios.create({
  baseURL: VITE_API_URL,
})

// DONE: configurar interceptores
productApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  }

  return config
})

export default productApi
