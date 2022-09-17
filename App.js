import React from 'react'
import { StyleSheet } from 'react-native'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'

import { UserProvider } from './src/context/userContext'
import { store } from './src/redux/store'
import Navigation from './src/routes/Navigation'
import { theme } from './src/utils/theme'

export default function App() {
	return (
		<UserProvider>
			<Provider store={store}>
				<PaperProvider theme={theme}>
					<StatusBar style='auto' />
					<Navigation />
				</PaperProvider>
			</Provider>
		</UserProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
