import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	user: null,
	loading: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setUser: (state, action) => {
			return { ...state, ...action.payload, loading: false }
		},
		logOut: (state) => {
			state.user = null
			AsyncStorage.clear()
		},
	},
})

// Action creators are generated for each case reducer function
export const { setUser, setLoading, logOut } = userSlice.actions

export default userSlice.reducer

// export const selecteduserReducer = (state = {}, { type, payload }) => {
// 	console.log(type)
// 	switch (type) {
// 		case ActionTypes.SELECTED_PRODUCT:
// 			return { ...state, ...payload }
// 		case ActionTypes.REMOVE_SELECTED_PRODUCT:
// 			return {}
// 		default:
// 			return state
// 	}
// }
