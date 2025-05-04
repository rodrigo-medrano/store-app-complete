import { configureStore } from '@reduxjs/toolkit'

import { productSlice, uiSlice, authSlice } from './'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
