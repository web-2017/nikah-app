import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './reducer/filterSlice'
import userSlice from './reducer/userSlice'

export const store = configureStore({
	reducer: {
		user: userSlice,
		filter: filterSlice,
	},
})
