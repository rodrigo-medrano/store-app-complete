import { createSlice } from '@reduxjs/toolkit' // Immer library

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    user: {},
    errorMessage: undefined,
    message: null,
  },
  reducers: {
    onChecking: state => {
      state.status = 'checking'
      state.user = {}
      state.errorMessage = undefined
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = undefined
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated'
      state.user = {}
      state.errorMessage = payload
    },
    onRegisterSuccess: (state, { payload }) => {
      state.status = 'register-success'
      state.user = payload
      state.message = 'Registro exitoso'
    },
    clearErrorMessage: state => {
      state.errorMessage = undefined
    },
  },
})

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions
