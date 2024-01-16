import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from '../features/auth/tokenSlice'

export default configureStore({
    reducer: {
      counter: tokenSlice,
    },
  })