import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

export const CustomLoaderScreen = () => {
	return (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator size='small' color='#0000ff' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 100,
	},
	horizontal: {
		// flexDirection: 'row',
		// justifyContent: 'center',
		// alignContent: 'center',
		// alignItems: 'center',
		// alignSelf: 'center',
		// padding: 10,
	},
})
