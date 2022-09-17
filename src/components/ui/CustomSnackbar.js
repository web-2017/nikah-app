import React from 'react'
import { Snackbar, Portal, useTheme } from 'react-native-paper'

export const CustomSnackbar = ({
	visible,
	children,
	onDismissSnackBar,
	location = 'bottom',
	bgColor = 'success',
}) => {
	const { colors } = useTheme()
	return (
		<Portal>
			<Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				wrapperStyle={{ [location]: 0 }}
				style={{
					backgroundColor: bgColor === 'success' ? colors.green : colors.red,
				}}
				action={{
					label: 'Close',
					color: '#fff',
					onPress: () => {},
				}}
			>
				{children}
			</Snackbar>
		</Portal>
	)
}
