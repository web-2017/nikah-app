import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'

export const initialStateSearchFilter = {
	language: '',
	akida: '',
	levelOfFaith: '',
	convertMuslim: '',
	originRace: '',
	height: '',
	weight: '',
	nationality: '',
	cityLiveNow: '',
	countryLiveNow: '',
	familyStatus: '',
	age: { from: '', to: '' },
}

export const searchSlice = createSlice({
	name: 'search',
	initialStateSearchFilter,
	reducers: {
		setFilter: (state, action) => {
			return {
				...state,
				...action.payload,
				age: { from: action.payload.from },
				to: { from: action.payload.to },
			}
		},
	},
})

// Action creators are generated for each case reducer function
export const { setFilter } = searchSlice.actions

export default searchSlice.reducer
