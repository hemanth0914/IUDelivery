import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice'
import EaterySlice from './slices/EaterySlice'
import LocationSlice from './slices/LocationSlice'
import authReducer from './slices/authSlice'; // Create this slice in the next step

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    eatery: EaterySlice,
    location: LocationSlice,
    auth: authReducer,
  },
})