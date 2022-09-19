import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import searchSlice from './reducer/searchSlice'
import userSlice from './reducer/userSlice'

export const store = configureStore({
	reducer: {
		user: userSlice,
		filter: searchSlice,
	},
	// middleware: [thunk],
})
