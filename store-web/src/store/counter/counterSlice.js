import { createSlice } from '@reduxjs/toolkit' // Immer library

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 10,
  },
  reducers: {
    incrementLoQueSea: (state, action) => {
      state.counter += action.payload
    },
  },
})

export const { incrementLoQueSea } = counterSlice.actions
