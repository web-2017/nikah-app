import React from 'react'
import { Portal, Dialog, Button } from 'react-native-paper'

export const CustomDialog = ({
	children,
	onPress,
	btnText,
	title,
	visible,
	onDismiss,
}) => {
	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>{children}</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onPress}>{btnText}</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	)
}
