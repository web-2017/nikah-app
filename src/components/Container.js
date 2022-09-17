import React from 'react'
import {
	StyleSheet,
	ScrollView,
	SafeAreaView,
	RefreshControl,
} from 'react-native'

const Container = ({ children, style, refreshing, onRefresh }) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={{ ...style }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				{children}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 2,
	},
})

export default Container
