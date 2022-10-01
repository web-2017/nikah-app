import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../store'

// Define a type for the slice stater
interface UserState {
	user: object
	isLoading: boolean
}

export const initialState: UserState = {
	user: {},
	isLoading: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		setUser: (state, action: PayloadAction<object>) => {
			state.user = action.payload
		},
		logOut: (state) => {
			state.user = {}
			AsyncStorage.clear()
		},
	},
})

// Action creators are generated for each case reducer function
export const { setUser, setLoading, logOut } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer
