import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  eatery: null,
}

export const EaterySlice = createSlice({
  name: 'eatery',
  initialState,
  reducers: {
    setEatery: (state, action) => {
      state.eatery = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEatery } = EaterySlice.actions

export const selectEatery = state => state.eatery.eatery;

export default EaterySlice.reducer 