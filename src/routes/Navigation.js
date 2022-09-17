import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const RootStack = createStackNavigator()
import { TabNavigation } from './TabNavigation'
import UserScreen from '../screens/UserScreen'

const Navigation = () => {
	return (
		<NavigationContainer>
			<RootStack.Navigator>
				<RootStack.Group>
					<RootStack.Screen
						options={{ headerShown: false }}
						name='Back'
						component={TabNavigation}
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
