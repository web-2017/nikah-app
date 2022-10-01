import React, { FC, ReactNode } from 'react'
import {
	StyleSheet,
	ScrollView,
	SafeAreaView,
	RefreshControl,
	ViewStyle,
	View,
} from 'react-native'

interface ContainerProps {
	children: any
	style?: any
	refreshing?: any
	onRefresh?: any
}

const Container: FC<ContainerProps> = ({
	children,
	style,
	refreshing,
	onRefresh,
}) => (
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 2,
	},
})

export default Container
