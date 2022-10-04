import React, { createContext, useState, useEffect, FC } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUserStore, IUser } from '../types/types'

const initialUserState = {
	users: [],
} as any

// Context
export const UserContext =
	createContext<typeof initialUserState>(initialUserState)

// Provider
export const UserProvider: FC<IUserStore> = ({ children }) => {
	const [stateUser, setStateUser] = useState<IUserStore | null>(
		initialUserState
	)

	useEffect(() => {
		;(async () => {
			const isUserStorage = await AsyncStorage.getItem('user')

			if (typeof isUserStorage === 'string') {
				setStateUser(JSON.parse(isUserStorage))
			}
		})()
	}, [])

	return (
		<UserContext.Provider value={[stateUser, setStateUser]}>
			{children}
		</UserContext.Provider>
	)
}
