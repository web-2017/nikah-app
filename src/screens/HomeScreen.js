import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Surface, useTheme } from 'react-native-paper'

import Container from '../components/Container'
import {
	CustomButton,
	CustomText,
	CustomSnackbar,
	CustomTitle,
} from '../components/ui'
import { userRoute } from '../api/apiRoutes'
import fetchHandler from '../utils/fetchHandler'
import { ConvertTime } from '../utils/filters/convertTime'
import { CustomLoaderScreen } from '../components/ui/CustomLoaderScreen'
import { UserContext } from '../context/userContext'
import { color } from 'react-native-reanimated'

const HomeScreen = ({ navigation }) => {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState('')
	const [colorMode, setColorMode] = useState('success')
	const [location, setLocation] = useState('bottom')
	const { colors } = useTheme()
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			await fetchUser()
		})

		return unsubscribe
	}, [])

	useEffect(() => {
		if (stateUser) {
			setMessage(`Welcome ${stateUser?.user?.firstName}`)
			setVisible(visible)
		}
	}, [])

	const fetchUser = async () => {
		setLoading(true)
		const user = await fetchHandler.getByIdDataHandler({
			url: userRoute,
			userId: stateUser?._id,
			token: stateUser?.token,
		})

		setStateUser({
			...stateUser,
			profile: user?.profile ? user?.profile : undefined,
			user: user?.user,
		})
		setLoading(false)
	}

	const onDismissSnackBar = () => {
		setVisible(false)
	}
	return (
		<Container>
			{loading ? (
				<CustomLoaderScreen />
			) : (
				<>
					<CustomSnackbar
						onDismissSnackBar={onDismissSnackBar}
						visible={visible}
						bgColor={colorMode}
						location={location}
					>
						{message}
					</CustomSnackbar>

					<Card style={styles.cardContainer}>
						<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
					</Card>

					<Surface style={styles.surface} elevation={4}>
						<CustomText style={{ fontSize: 14, color: colors.gray }}>
							Created:{' '}
							{ConvertTime({
								time: stateUser?.user?.createdAt,
								mode: 'multiple',
							})}
							{', '}
							{ConvertTime({ time: stateUser?.user?.createdAt })}
						</CustomText>
						<CustomText style={{ fontSize: 14, color: colors.gray }}>
							User id: {stateUser?.user?.uniqUserId}.
						</CustomText>
						<CustomTitle style={{ color: colors.blue }}>"About me"</CustomTitle>

						<CustomText>
							Name:{' '}
							{stateUser?.user?.firstName + ' ' + stateUser?.user?.lastName}.
						</CustomText>
						<CustomText>Phone: {stateUser?.user?.phone}.</CustomText>
						<CustomText>
							Profile filled by: {stateUser?.user?.profileCreatedBy}.
						</CustomText>
						<CustomText>Sex: {stateUser?.user?.sex}.</CustomText>
						<CustomText>DOB: {stateUser?.user?.dob}.</CustomText>
						<CustomText>
							Age:{' '}
							{ConvertTime({
								mode: 'getCurrentAge',
								time: stateUser?.user?.dob,
							})}{' '}
							years.
						</CustomText>
						<CustomButton
							onPress={() => navigation.navigate('User')}
							mode='outlined'
							style={{ justifyContent: 'flex-end' }}
						>
							Edit
						</CustomButton>
					</Surface>
					<Surface style={styles.surface} elevation={4}>
						<CustomTitle style={{ color: colors.blue }}>
							Description
						</CustomTitle>
						<CustomText>{stateUser?.profile?.description}.</CustomText>
					</Surface>
					{/* Profile */}
					{!stateUser?.profile ? (
						<>
							<CustomTitle style={{ color: colors.primary }}>
								Вы должны заполнить свой профиль
							</CustomTitle>
							<CustomButton
								onPress={() => navigation.navigate('Profile')}
								color={colors.green}
							>
								Перейти
							</CustomButton>
						</>
					) : (
						<>
							<Surface style={styles.surface} elevation={4}>
								<CustomTitle style={{ color: colors.blue }}>
									"Islam"
								</CustomTitle>
								<CustomText>
									Convert muslim: {stateUser?.profile?.convertMuslim}.
								</CustomText>
								<CustomText>
									My Faith: {stateUser?.profile?.levelOfFaith}.
								</CustomText>
								<CustomText>Akida: {stateUser?.profile?.akida}.</CustomText>
								<CustomButton
									mode='outlined'
									style={{ justifyContent: 'flex-end' }}
									onPress={() => navigation.navigate('Profile')}
								>
									Edit
								</CustomButton>
							</Surface>
							<Surface style={styles.surface} elevation={4}>
								<CustomTitle style={{ color: colors.blue }}>
									"Material status"
								</CustomTitle>
								<CustomText>
									Monthly income: {stateUser?.profile?.incomeMonth}$
								</CustomText>
								<CustomText>
									Yearly income: {stateUser?.proutofile?.incomeYear}$
								</CustomText>
								<CustomButton
									mode='outlined'
									style={{ justifyContent: 'flex-end' }}
									onPress={() => navigation.navigate('Profile')}
								>
									Edit
								</CustomButton>
							</Surface>
							<Surface style={styles.surface} elevation={4}>
								<CustomTitle style={{ color: colors.blue }}>
									"Info about me"
								</CustomTitle>
								<CustomText>
									Family status: {stateUser?.profile?.familyStatus}.
								</CustomText>
								<CustomText>Kids: {stateUser?.profile?.kids}.</CustomText>
								<CustomText>
									Origin race: {stateUser?.profile?.originRace}.
								</CustomText>
								<CustomText>
									Nationality: {stateUser?.profile?.origin?.nationality}.
								</CustomText>
								<CustomText>
									Country Birth: {stateUser?.profile?.origin?.countryOfBirth}.
								</CustomText>
								<CustomText>
									Country live now: {stateUser?.profile?.origin?.countryLiveNow}
									.
								</CustomText>
								<CustomText>
									City live now: {stateUser?.profile?.origin?.cityLiveNow}.
								</CustomText>
								<CustomText>
									Your status resident:{' '}
									{stateUser?.profile?.origin?.statusResident}.
								</CustomText>
								<CustomText>
									Height: {stateUser?.profile?.appearance?.height}.
								</CustomText>
								<CustomText>
									Weight: {stateUser?.profile?.appearance?.weight}.
								</CustomText>
								<CustomText>
									Disability: {stateUser?.profile?.appearance?.disability}.
								</CustomText>
								<CustomText>
									Language: {stateUser?.profile?.languages?.toString()}.
								</CustomText>
								<CustomText>
									Wanna kids?: {stateUser?.profile?.wannaKidsMore}.
								</CustomText>
								<CustomText>
									Education: {stateUser?.profile?.career?.education}.
								</CustomText>
								<CustomText>
									Job title: {stateUser?.profile?.career?.jobTitle}.
								</CustomText>
								<CustomText>
									Qualification: {stateUser?.profile?.career?.qualification}.
								</CustomText>
								<CustomText>
									Specialization: {stateUser?.profile?.career?.specialization}.
								</CustomText>
								<CustomButton
									mode='outlined'
									style={{ justifyContent: 'flex-end' }}
									onPress={() => navigation.navigate('Profile')}
								>
									Edit
								</CustomButton>
							</Surface>
						</>
					)}
				</>
			)}
		</Container>
	)
}

const styles = StyleSheet.create({
	surface: {
		padding: 8,
		marginBottom: 5,
	},
	cardContainer: {
		marginBottom: 10,
	},
})

export default HomeScreen
