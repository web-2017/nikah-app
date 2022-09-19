import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

const THUMB_RADIUS = 12

const Thumb = () => {
	const { colors } = useTheme()
	return <View style={{ ...styles.root, backgroundColor: colors.blue }} />
}
const styles = StyleSheet.create({
	root: {
		width: THUMB_RADIUS * 2,
		height: THUMB_RADIUS * 2,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: '#ffffff',
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: -1 },
		shadowOpacity: 0.16,
		shadowRadius: 6,
	},
})

export default memo(Thumb)
