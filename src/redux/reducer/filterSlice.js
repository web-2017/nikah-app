import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	// 	language: '',
	// 	akida: '',
	// 	levelOfFaith: '',
	// 	convertMuslim: '',
	// 	originRace: '',
	// 	height: '',
	// 	weight: '',
	// 	nationality: '',
	// 	cityLiveNow: '',
	// 	countryLiveNow: '',
	// 	familyStatus: '',
	// 	fromAge: '',
	// 	toAge: '',
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilter: (state, action) => {
			state = { ...state, ...action.payload }
			console.log(12345, state)
			return state
		},
	},
})

// Action creators are generated for each case reducer function
export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
