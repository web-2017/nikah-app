import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Divider, Surface, useTheme } from 'react-native-paper'
import Fontisco from 'react-native-vector-icons/Fontisto'

import { profileRoute } from '../api/apiRoutes'
import Container from '../components/Container'
import { CustomText, CustomTitle } from '../components/ui/'
import fetchHandler from '../utils/fetchHandler'
import { ConvertTime } from '../utils/filters/convertTime'

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
		// console.log(getProfile?.profile)
		setProfile(getProfile?.profile)
		setUser(getProfile?.user)
	}

	return (
		<Container style={{ marginHorizontal: 5 }}>
			<View style={styles.imageSection}>
				<View style={styles.leftImageSection}>
					<Avatar.Icon
						size={100}
						color={'red'}
						style={{ backgroundColor: colors.yellow, justifyContent: 'center' }}
						icon={() => <Fontisco name='female' size={50} />}
					/>
				</View>
				<View style={styles.rightImageSection}>
					<CustomText>
						{user?.firstName} {user?.lastName}
					</CustomText>
					<CustomText>
						{ConvertTime({
							time: user?.dob,
							mode: 'getCurrentAge',
						})}{' '}
						years
					</CustomText>
					<CustomText style={{ color: colors.accent }}>
						Created: {user?.profileCreatedBy}
					</CustomText>
					<CustomText>Email: {user?.email}</CustomText>
					<CustomText>Phone: {user?.phone}</CustomText>

					<CustomText style={{ fontSize: 14, color: colors.gray }}>
						Created:{' '}
						{ConvertTime({
							time: user?.createdAt,
							mode: 'multiple',
						})}
						{', '}
						{ConvertTime({ time: user?.createdAt })}
					</CustomText>
				</View>
			</View>
			<Divider
				style={{
					borderWidth: 0.4,
					marginVertical: 5,
					borderColor: colors.accent,
				}}
			/>
			<View>
				<CustomTitle style={{ color: colors.blue }}>"Description"</CustomTitle>
				<CustomText style={{ ...styles.text }}>
					Description: {profile?.description}.
				</CustomText>
				<CustomTitle style={{ color: colors.blue }}>"Islam"</CustomTitle>
				<CustomText style={{ ...styles.text }}>
					Convert muslim: {profile?.convertMuslim}.
				</CustomText>
				<CustomText style={styles.text}>
					My Faith: {profile?.levelOfFaith}.
				</CustomText>
				<CustomText style={styles.text}>Akida: {profile?.akida}.</CustomText>
				<CustomTitle style={{ color: colors.blue }}>
					"Info about me"
				</CustomTitle>
				<CustomText style={styles.text}>
					Family status: {profile?.familyStatus}.
				</CustomText>
				<CustomText style={styles.text}>Kids: {profile?.kids}.</CustomText>
				<CustomText style={styles.text}>
					Origin race: {profile?.originRace}.
				</CustomText>
				<CustomText style={styles.text}>
					Nationality: {profile?.origin?.nationality}.
				</CustomText>
				<CustomText style={styles.text}>
					Country Birth: {profile?.origin?.countryOfBirth}.
				</CustomText>
				<CustomText style={styles.text}>
					Country live now: {profile?.origin?.countryLiveNow}.
				</CustomText>
				<CustomText style={styles.text}>
					City live now: {profile?.origin?.cityLiveNow}.
				</CustomText>
				<CustomText style={styles.text}>
					Your status resident: {profile?.origin?.statusResident}.
				</CustomText>
				<CustomText style={styles.text}>
					Height: {profile?.appearance?.height}.
				</CustomText>
				<CustomText style={styles.text}>
					Weight: {profile?.appearance?.weight}.
				</CustomText>
				<CustomText style={styles.text}>
					Disability: {profile?.appearance?.disability}.
				</CustomText>
				<CustomText style={styles.text}>
					Language: {profile?.languages?.toString()}.
				</CustomText>
				<CustomText style={styles.text}>
					Wanna kids more: {profile?.wannaKidsMore}.
				</CustomText>
				<CustomText style={styles.text}>
					Education: {profile?.career?.education}.
				</CustomText>
				<CustomText style={styles.text}>
					Job title: {profile?.career?.jobTitle}.
				</CustomText>
				<CustomText style={styles.text}>
					Qualification: {profile?.career?.qualification}.
				</CustomText>
				<CustomText style={styles.text}>
					Specialization: {profile?.career?.specialization}.
				</CustomText>
				<CustomTitle style={{ color: colors.blue }}>
					"Material status"
				</CustomTitle>
				<CustomText style={styles.text}>
					Monthly income: {profile?.incomeMonth}$
				</CustomText>
				<CustomText style={styles.text}>
					Yearly income: {profile?.incomeYear}$
				</CustomText>
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	imageSection: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
	},
	leftImageSection: {
		flexDirection: 'row',
		justifyContent: 'center',
		flex: 1,
	},
	rightImageSection: {
		flex: 2,
	},
	// justifyContent: 'flex-start',
	surface: {
		padding: 15,
	},
	text: {
		marginVertical: 3,
	},
})

export default DateProfileScreen
