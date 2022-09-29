import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'

import { CustomButton, CustomSnackbar } from '../components/ui/'
import Container from '../components/Container'
import ShowProfileDialogs from '../components/ShowProfileDialogs'
import fetchHandler from '../utils/fetchHandler'
import { profileRoute } from '../api/apiRoutes'
import { getData } from '../utils/storeData'
import { CustomLoaderScreen } from '../components/ui/CustomLoaderScreen'
import { setLoading } from '../redux/reducer/userSlice'
import { ProfileInputs } from '../components/ProfileInputs'

const ProfileScreen = () => {
	const { loading } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const [familyStatus, setFamilyStatus] = useState('')
	const [isFamilyStatus, setIsFamilyStatus] = useState('')
	const [wannaKidsMore, setWannaKidsMore] = useState('')
	const [isWannaKidsMore, setIsWannaKidsMore] = useState(false)
	const [levelOfFaith, setLevelOfFaith] = useState('')
	const [isLevelOfFaith, setIsLevelOfFaith] = useState(false)
	const [convertMuslim, setConvertMuslim] = useState('')
	const [akida, setAkida] = useState('')
	const [isAkida, setIsAkida] = useState('')
	const [isConvertMuslim, setIsConvertMuslim] = useState(false)
	const [appearance, setAppearance] = useState({
		height: '',
		weight: '',
		disability: '',
	})
	const [originRace, setOriginRace] = useState('')
	const [isOriginRace, setIsOriginRace] = useState(false)
	const [origin, setOrigin] = useState({
		nationality: '',
		countryOfBirth: '',
		countryLiveNow: '',
		cityLiveNow: '',
		statusResident: '',
	})
	const [isShowNationality, setIsShowNationality] = useState(false)
	const [isShowCountryLiveNow, setIsShowCountryLiveNow] = useState(false)
	const [isStatus, setIsStatus] = useState(false)
	const [career, setCareer] = useState({
		qualification: '',
		education: '',
		jobTitle: '',
		specialization: '',
	})

	const [incomeMonth, setIncomeMonth] = useState('')
	const [incomeYear, setIncomeYear] = useState('')
	const [kids, setKids] = useState('')
	const [age, setAge] = useState(18)

	const [description, setDescription] = useState('')
	const [languages, setLanguages] = useState('')

	const [showCountries, setShowCountries] = useState(false)
	const [showSnackbar, setShowSnackbar] = useState(false)
	const [message, setMessage] = useState('All field required')
	const [userId, setUserId] = useState(null)
	const [token, setToken] = useState(null)
	const [fetchMethod, setFetchMethod] = useState('POST')
	const [postId, setPostId] = useState(null)

	const onDismissSnackBar = () => {
		setShowSnackbar(false)
	}

	useFocusEffect(
		useCallback(() => {
			const getStorageData = async () => {
				const storageUser = await getData('user')
				const userStorage = JSON.parse(storageUser)

				if (userStorage) {
					setUserId(userStorage?._id)
					setToken(userStorage?.token)
				}
			}
			getStorageData()

			const unsubscribe = getStorageData

			return () => unsubscribe()
		}, [])
	)

	useEffect(() => {
		;(async () => {
			if (token) {
				dispatch(setLoading(true))

				// get current user profile
				const fetchCurrentProfileData = await getCurrentProfile()
				// if profile exist change method on PUT
				const profile = fetchCurrentProfileData?.profile

				if (profile?._id) {
					setFetchMethod('PUT')
					setPostId(profile?._id)

					// console.log(fetchCurrentProfileData)

					setFamilyStatus(profile?.familyStatus)
					setWannaKidsMore(profile?.wannaKidsMore)
					setLanguages(profile?.languages)
					setLevelOfFaith(profile?.levelOfFaith)
					setConvertMuslim(profile?.convertMuslim)
					setAkida(profile?.akida)
					setOrigin({
						nationality: profile?.origin?.nationality,
						countryOfBirth: profile?.origin?.countryOfBirth,
						countryLiveNow: profile?.origin?.countryLiveNow,
						cityLiveNow: profile?.origin?.cityLiveNow,
						statusResident: profile?.origin?.statusResident,
					})
					setAppearance({
						height: profile?.appearance?.height,
						weight: profile?.appearance?.weight,
						disability: profile?.appearance?.disability,
					})
					setOriginRace(profile?.originRace)
					setCareer({
						qualification: profile?.career?.qualification,
						education: profile?.career?.education,
						jobTitle: profile?.career?.jobTitle,
						specialization: profile?.career?.specialization,
					})
					setIncomeMonth(profile?.incomeMonth)
					setIncomeYear(profile?.incomeYear)
					setDescription(profile?.description)
					setKids(profile?.kids)
					dispatch(setLoading(false))
				} else {
					setFetchMethod('POST')
					dispatch(setLoading(false))
				}
			}
		})()
	}, [token])

	// const searchCities = async () => {
	// 	await fetch(COUNTRIES_BY_NAME('russia'), {
	// 		method: 'get',
	// 	})
	// 		.then((response) => response.text())
	// 		.then((result) => {
	// 			console.log(result)
	// 		})
	// 		.catch((error) => console.log('error', error))
	// }

	const getCurrentProfile = async () =>
		await fetchHandler.getByIdDataHandler({
			url: profileRoute,
			userId: userId,
			token: token,
		})

	const fetchData = async () => {
		if (fetchMethod === 'POST') {
			dispatch(setLoading(true))
			const obj = {
				familyStatus,
				wannaKidsMore,
				levelOfFaith,
				convertMuslim,
				appearance,
				originRace,
				akida,
				kids,
				origin,
				career,
				incomeMonth,
				incomeYear,
				description,
				languages,
			}

			try {
				await fetchHandler.createProfile({
					url: profileRoute,
					body: obj,
					token: token,
				})
				setMessage('Success')
				setShowSnackbar(true)
				dispatch(setLoading(false))
			} catch (error) {
				setMessage('Error, try again')
				setShowSnackbar(false)
				dispatch(setLoading(false))
				console.error(error)
			}
		} else {
			editProfile()
		}
	}

	const editProfile = async () => {
		const obj = {
			familyStatus,
			wannaKidsMore,
			levelOfFaith,
			convertMuslim,
			appearance,
			originRace,
			akida,
			kids,
			origin,
			career,
			incomeMonth,
			incomeYear,
			description,
			languages,
		}
		try {
			if (postId) {
				dispatch(setLoading(true))

				await fetchHandler.editProfile({
					url: profileRoute,
					token,
					body: { ...obj, postId: postId },
				})

				setMessage('Success update profile')
				setShowSnackbar(true)
				dispatch(setLoading(false))
			} else {
				dispatch(setLoading(false))
				setShowSnackbar(false)
				console.log('postId required')
			}
		} catch (error) {
			dispatch(setLoading(false))
			setShowSnackbar(false)
			console.error(error)
		}
	}

	return (
		<Container>
			{loading ? (
				<CustomLoaderScreen />
			) : (
				<>
					<CustomSnackbar
						location='top'
						onDismissSnackBar={onDismissSnackBar}
						visible={showSnackbar}
					>
						{message}
					</CustomSnackbar>

					<ShowProfileDialogs
						akida={akida}
						setAkida={setAkida}
						setIsAkida={setIsAkida}
						isAkida={isAkida}
						isOriginRace={isOriginRace}
						setIsOriginRace={setIsOriginRace}
						setIsShowCountryLiveNow={setIsShowCountryLiveNow}
						isShowCountryLiveNow={isShowCountryLiveNow}
						wannaKidsMore={wannaKidsMore}
						setWannaKidsMore={setWannaKidsMore}
						setIsWannaKidsMore={setIsWannaKidsMore}
						isWannaKidsMore={isWannaKidsMore}
						originRace={originRace}
						setOriginRace={setOriginRace}
						isConvertMuslim={isConvertMuslim}
						setConvertMuslim={setConvertMuslim}
						convertMuslim={convertMuslim}
						setIsConvertMuslim={setIsConvertMuslim}
						familyStatus={familyStatus}
						setFamilyStatus={setFamilyStatus}
						isFamilyStatus={isFamilyStatus}
						setIsFamilyStatus={setIsFamilyStatus}
						setOrigin={setOrigin}
						origin={origin}
						showCountries={showCountries}
						setShowCountries={setShowCountries}
						levelOfFaith={levelOfFaith}
						setLevelOfFaith={setLevelOfFaith}
						isLevelOfFaith={isLevelOfFaith}
						setIsLevelOfFaith={setIsLevelOfFaith}
						isShowNationality={isShowNationality}
						setIsShowNationality={setIsShowNationality}
						isStatus={isStatus}
						setIsStatus={setIsStatus}
					/>

					<ProfileInputs
						age={age}
						setAge={setAge}
						kids={kids}
						setKids={setKids}
						familyStatus={familyStatus}
						setFamilyStatus={setFamilyStatus}
						setIsFamilyStatus={setIsFamilyStatus}
						wannaKidsMore={wannaKidsMore}
						setIsWannaKidsMore={setIsWannaKidsMore}
						setWannaKidsMore={setWannaKidsMore}
						languages={languages}
						setLanguages={setLanguages}
						levelOfFaith={levelOfFaith}
						setLevelOfFaith={setLevelOfFaith}
						setIsLevelOfFaith={setIsLevelOfFaith}
						akida={akida}
						setAkida={setAkida}
						setIsAkida={setIsAkida}
						convertMuslim={convertMuslim}
						setConvertMuslim={setConvertMuslim}
						setIsConvertMuslim={setIsConvertMuslim}
						appearance={appearance}
						setAppearance={setAppearance}
						origin={origin}
						setOrigin={setOrigin}
						originRace={originRace}
						setOriginRace={setOriginRace}
						setIsStatus={setIsStatus}
						setIsOriginRace={setIsOriginRace}
						setCareer={setCareer}
						career={career}
						setShowCountries={setShowCountries}
						setIsShowCountryLiveNow={setIsShowCountryLiveNow}
						setIsShowNationality={setIsShowNationality}
						setIncomeMonth={setIncomeMonth}
						incomeMonth={incomeMonth}
						setIncomeYear={setIncomeYear}
						incomeYear={incomeYear}
						setDescription={setDescription}
						description={description}
					/>
					<CustomButton text='white' onPress={() => fetchData()}>
						Save Profile
					</CustomButton>
				</>
			)}
		</Container>
	)
}

export default ProfileScreen
