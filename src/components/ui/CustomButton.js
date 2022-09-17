import React from 'react'
import { View } from 'react-native'
import { Button, useTheme } from 'react-native-paper'

export const CustomButton = ({
	style,
	children,
	mode = 'contained',
	onPress,
	loading,
	color,
}) => {
	const { colors } = useTheme()
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
				marginVertical: 5,

				...style,
			}}
		>
			<Button
				color={color || colors.accent}
				onPress={onPress}
				loading={loading}
				icon='send'
				mode={mode} // 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'
			>
				{children}
			</Button>
		</View>
	)
}
