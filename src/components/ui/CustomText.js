import React from 'react'
import { Platform } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

// all fontFamily in '../ui-kit/FontFamily.js.js'
export const CustomText = ({ children, style, onPress }) => {
	const { colors } = useTheme()
	return (
		<Text
			onPress={onPress}
			style={{
				fontFamily: `${
					Platform.OS === 'ios' ? 'American Typewriter' : 'Roboto'
				}`,
				fontSize: 18,
				color: colors.primary,
				...style,
			}}
		>
			{children}
		</Text>
	)
}
