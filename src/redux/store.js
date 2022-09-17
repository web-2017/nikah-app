import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import userSlice from './reducer/userSlice'

export const store = configureStore({
	reducer: {
		user: userSlice,
	},
	// middleware: [thunk],
})
