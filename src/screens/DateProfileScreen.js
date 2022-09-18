import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'
import Fontisco from 'react-native-vector-icons/Fontisto'

import { profileRoute } from '../api/apiRoutes'
import Container from '../components/Container'
import { CustomText, CustomTitle } from '../components/ui/'
import fetchHandler from '../utils/fetchHandler'

const DateProfileScreen = ({ route }) => {
	const { id, token } = route.params
	const { colors } = useTheme()
	const [profile, setProfile] = useState('')
	const [user, setUser] = useState('')
	useEffect(() => {
		getCurrentProfile()
	}, [id])

	const getCurrentProfile = async () => {
		const getProfile = await fetchHandler.getByIdDataHandler({
			url: profileRoute,
			userId: id,
			token,
		})

		setProfile(getProfile?.profile)
		setUser(getProfile?.user)
	}

	return (
		<Container>
			<View style={styles.imageSection}>
				<View style={styles.leftImageSection}>
					<Avatar.Icon
						size={80}
						color={'red'}
						style={{ backgroundColor: colors.yellow }}
						icon={() => <Fontisco name='female' size={40} />}
					/>
				</View>
				<View style={styles.rightImageSection}>
					<CustomText>Hello</CustomText>
					<CustomTitle>Hello</CustomTitle>
				</View>
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	imageSection: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		alignItems: 'center',
		height: 100,
		borderBottomColor: 'red',
		borderWidth: 1,
	},
	leftImageSection: {
		justifyContent: 'center',
		flex: 1,
	},
	rightImageSection: {
		// justifyContent: 'flex-start',
		flex: 3,
	},
})

export default DateProfileScreen
