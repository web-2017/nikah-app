import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	filter: {
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
		fromAge: '',
		toAge: '',
	},
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setFilter: (state, action) => {
			return {
				...state,
				...action.payload,
			}
		},
	},
})

// Action creators are generated for each case reducer function
export const { setFilter } = searchSlice.actions

export default searchSlice.reducer
