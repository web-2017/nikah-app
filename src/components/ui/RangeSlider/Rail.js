import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'

const Rail = () => (
	<View style={{ ...styles.root, backgroundColor: '#6c757d' }} />
)

export default memo(Rail)

const styles = StyleSheet.create({
	root: {
		flex: 1,
		height: 2,
		borderRadius: 2,
	},
})
