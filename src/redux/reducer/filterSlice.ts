import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { IProfile } from '../../types/types'

export const initialState: IProfile = {
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
} as any

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilter: (state, action) => {
			state = action.payload
		},
	},
})

// Action creators are generated for each case reducer function

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
