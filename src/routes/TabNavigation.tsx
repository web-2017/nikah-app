import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from 'react-native-vector-icons'
import { useTheme } from 'react-native-paper'

import ProfileScreen from '../screens/ProfileScreen'
import { DrawerNavigator } from './DrawerNavigation'
import SignUpScreen from '../screens/SignUpScreen'
import LogInScreen from '../screens/LogInScreen'
import Users from '../screens/Users'
import FavoriteScreen from '../screens/FavoriteScreen'
import { IUser, UserContext } from '../context/userContext'

type RootStackParamList = {
	Home: undefined
	Profile: undefined
}

const Tab = createBottomTabNavigator<RootStackParamList>()

export const TabNavigation = () => {
	const { colors } = useTheme()

	const [stateUser, setStateUser] = useContext<string>(UserContext)

	// console.log('tab', stateUser?._id)
	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={({ route }) => {
				// const colors = useTheme()
				return {
					tabBarIcon: ({ focused, color, size }) => {
						let iconName
						if (route.name === 'Home') {
							iconName = focused ? 'home' : 'home-outline'
						} else if (route.name === 'Profile') {
							iconName = focused ? 'list' : 'list-outline'
						} else if (route.name === 'Signup') {
							iconName = focused
								? 'american-football'
								: 'american-football-outline'
						} else if (route.name === 'Login') {
							iconName = focused ? 'log-in' : 'log-in-outline'
						} else if (route.name === 'Users') {
							iconName = focused ? 'search-circle' : 'search-circle-outline'
						} else if (route.name === 'Favorite') {
							iconName = focused ? 'heart-circle' : 'heart-circle-outline'
						}
						return <Ionicons name={iconName} size={size} color={color} />
					},
					tabBarActiveTintColor: colors.accent,
					tabBarInactiveTintColor: colors.gray,
				}
			}}
		>
			{stateUser?.user?._id ? (
				<>
					<Tab.Screen
						name='Home'
						component={DrawerNavigator}
						options={{
							tabBarLabel: 'Home',
							headerShown: false,
						}}
					/>
					<Tab.Screen
						name='Users'
						options={{
							tabBarLabel: 'Users',
							headerShown: true,
						}}
						component={Users}
					/>
					<Tab.Screen
						name='Favorite'
						options={{
							tabBarLabel: 'Favorite',
							headerShown: true,
						}}
						component={FavoriteScreen}
					/>
					<Tab.Screen
						name='Profile'
						options={{
							tabBarLabel: 'Profile',
							headerShown: true,
						}}
						component={ProfileScreen}
					/>
				</>
			) : (
				<>
					<Tab.Screen
						name='Signup'
						component={SignUpScreen}
						options={{
							tabBarLabel: 'SignUp',
							headerShown: true,
						}}
					/>
					<Tab.Screen
						name='Login'
						options={{
							tabBarLabel: 'LogIn',
							headerShown: false,
						}}
						component={LogInScreen}
					/>
				</>
			)}
		</Tab.Navigator>
	)
}
