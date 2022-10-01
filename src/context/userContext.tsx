import React, { createContext, useState, useEffect, FC, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUserStore, IUser } from '../types/types'

const initialUserState = null

// Context
export const UserContext = createContext<IUser | null>(initialUserState)

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
