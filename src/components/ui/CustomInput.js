import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

export const CustomInput = ({
	value,
	style,
	label = 'First Name',
	setState,
	mode = 'outlined',
	...props
}) => {
	return (
		<TextInput
			style={{ ...styles.input, ...style }}
			label={label}
			dense
			autoCapitalize='none'
			mode={mode} // outlined, flat
			clearButtonMode
			value={value}
			onChangeText={(text) => setState(text)}
			{...props}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		marginVertical: 5,
	},
})
