import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const RootStack = createStackNavigator()
import { TabNavigation } from './TabNavigation'
import UserScreen from '../screens/UserScreen'
import DateProfileScreen from '../screens/DateProfileScreen'
import { UserContext } from '../context/userContext'

const Navigation = () => {
	const [stateUser, setStateUser] = useContext(UserContext)
	return (
		<NavigationContainer>
			<RootStack.Navigator>
				<RootStack.Group>
					<RootStack.Screen
						options={{ headerShown: false }}
						name='Back'
						component={TabNavigation}
					/>
					<RootStack.Screen
						options={{
							headerShown: true,
							headerTitle:
								stateUser?.user?.sex === 'Male' ? 'Sister' : 'Brother',
						}}
						name='Date'
						component={DateProfileScreen}
					/>
				</RootStack.Group>
				<RootStack.Group screenOptions={{ presentation: 'modal' }}>
					<RootStack.Screen name='User' component={UserScreen} />
				</RootStack.Group>
			</RootStack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
