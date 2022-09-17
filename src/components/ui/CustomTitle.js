import React from 'react'
import { Title, useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'

export const CustomTitle = ({ children, style }) => {
	const { colors } = useTheme()
	return (
		<Title
			style={{
				color: style?.color ? style?.color : colors.primary,
				fontFamily: `${
					Platform.OS === 'ios' ? 'American Typewriter' : 'Roboto'
				}`,
				...styles.title,
				...style,
			}}
		>
			{children}
		</Title>
	)
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 22,
	},
})
