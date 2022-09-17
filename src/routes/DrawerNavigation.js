import React, { useContext } from 'react'
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer'
import { Ionicons } from 'react-native-vector-icons'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserContext } from '../context/userContext'
import { logOut } from '../redux/reducer/userSlice'
import ProfileScreen from '../screens/ProfileScreen'
import HomeScreen from '../screens/HomeScreen'
import UserScreen from '../screens/UserScreen'

const Drawer = createDrawerNavigator()

export const DrawerNavigator = () => {
	const [stateUser, setStateUser] = useContext(UserContext)
	const dispatch = useDispatch()

	const logOutHandler = async () => {
		dispatch(logOut())
		setStateUser(null)
		await AsyncStorage.removeItem('user')
	}

	function CustomDrawerLogoutButton(props) {
		return (
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
				<DrawerItem label='Log Out' onPress={() => logOutHandler()} />
			</DrawerContentScrollView>
		)
	}

	return (
		<Drawer.Navigator
			initialRouteName='Main'
			drawerContent={(props) => <CustomDrawerLogoutButton {...props} />}
			screenOptions={{
				headerRight: () => (
					<Ionicons
						name={'filter'}
						style={{ marginHorizontal: 20 }}
						size={20}
						color={'blue'}
						onPress={() => logOutHandler()}
					/>
				),
			}}
		>
			<Drawer.Screen name='Main' component={HomeScreen} />
		</Drawer.Navigator>
	)
}
