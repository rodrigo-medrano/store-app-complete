import { createSlice } from '@reduxjs/toolkit' // Immer library
import { addDays } from 'date-fns'

const tempProduct = {
  _id: new Date().getTime(),
  name: 'Leche Entera',
  product_date: new Date(),
  expiration_date: addDays(new Date(), 20),
  stock: 120,
  price: 7,
  tags: ['bebida', 'natural', 'refrigerada'],
}

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [tempProduct],
    activeProduct: null,
  },
  reducers: {
    onSetActiveProduct: (state, { payload }) => {
      state.activeProduct = payload
    },
    onAddNewProduct: (state, { payload }) => {
      state.products.push(payload)
      state.activeProduct = null
    },
  },
})

export const { onSetActiveProduct, onAddNewProduct } = productSlice.actions
