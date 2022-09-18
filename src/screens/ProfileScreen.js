import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'

import { CustomButton, CustomInput, CustomSnackbar } from '../components/ui/'
import Container from '../components/Container'
import ShowProfileDialogs from '../components/ShowProfileDialogs'
import { RegNumbers } from '../utils/filters/regNumbers'
import fetchHandler from '../utils/fetchHandler'
import { profileRoute } from '../api/apiRoutes'
import { getData } from '../utils/storeData'
import { CustomLoaderScreen } from '../components/ui/CustomLoaderScreen'
import { setLoading } from '../redux/reducer/userSlice'

const ProfileScreen = ({ navigation }) => {
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
				console.log(11, fetchCurrentProfileData?.profile?.description)
				if (fetchCurrentProfileData?.profile?._id) {
					setFetchMethod('PUT')
					setPostId(fetchCurrentProfileData?.profile?._id)

					console.log(fetchCurrentProfileData)

					setFamilyStatus(fetchCurrentProfileData?.profile?.familyStatus)
					setWannaKidsMore(fetchCurrentProfileData?.profile?.wannaKidsMore)
					setLanguages(fetchCurrentProfileData?.profile?.languages)
					setLevelOfFaith(fetchCurrentProfileData?.profile?.levelOfFaith)
					setConvertMuslim(fetchCurrentProfileData?.profile?.convertMuslim)
					setAkida(fetchCurrentProfileData?.profile?.akida)
					setOrigin({
						nationality: fetchCurrentProfileData?.profile?.origin?.nationality,
						countryOfBirth:
							fetchCurrentProfileData?.profile?.origin?.countryOfBirth,
						countryLiveNow:
							fetchCurrentProfileData?.profile?.origin?.countryLiveNow,
						cityLiveNow: fetchCurrentProfileData?.profile?.origin?.cityLiveNow,
						statusResident:
							fetchCurrentProfileData?.profile?.origin?.statusResident,
					})
					setAppearance({
						height: fetchCurrentProfileData?.profile?.appearance?.height,
						weight: fetchCurrentProfileData?.profile?.appearance?.weight,
						disability:
							fetchCurrentProfileData?.profile?.appearance?.disability,
					})
					setOriginRace(fetchCurrentProfileData?.profile?.originRace)
					setCareer({
						qualification:
							fetchCurrentProfileData?.profile?.career?.qualification,
						education: fetchCurrentProfileData?.profile?.career?.education,
						jobTitle: fetchCurrentProfileData?.profile?.career?.jobTitle,
						specialization:
							fetchCurrentProfileData?.profile?.career?.specialization,
					})
					setIncomeMonth(fetchCurrentProfileData?.profile?.incomeMonth)
					setIncomeYear(fetchCurrentProfileData?.profile?.incomeYear)
					setDescription(fetchCurrentProfileData?.profile?.description)
					setKids(fetchCurrentProfileData?.profile?.kids)
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

				const fetchEditPost = await fetchHandler.editProfile({
					url: profileRoute,
					token,
					body: { ...obj, postId: postId },
				})
				// const data = await fetchEditPost
				// console.log('Edit post', data)
				console.log(fetchEditPost)
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

					<CustomSnackbar
						location='top'
						onDismissSnackBar={onDismissSnackBar}
						visible={showSnackbar}
					>
						{message}
					</CustomSnackbar>
					<CustomInput
						value={RegNumbers(kids)}
						label='How many kids?'
						maxLength={2}
						setState={(v) => setKids(v)}
					/>
					<CustomInput
						value={familyStatus}
						label='Family status'
						disabled
						onPressIn={() => setIsFamilyStatus(true)}
						setState={(v) => setFamilyStatus(v)}
					/>
					<CustomInput
						value={wannaKidsMore}
						label='wanna kids more?'
						disabled
						onPressIn={() => setIsWannaKidsMore(true)}
						setState={(v) => setWannaKidsMore(v)}
					/>
					<CustomInput
						value={languages}
						label='What language do you speak?'
						setState={(v) => setLanguages(v)}
					/>
					<CustomInput
						value={levelOfFaith}
						label='level Of Faith'
						disabled
						onPressIn={() => setIsLevelOfFaith(true)}
						setState={(v) => setLevelOfFaith(v)}
					/>
					<CustomInput
						value={akida}
						label='Akida'
						disabled
						onPressIn={() => setIsAkida(true)}
						setState={(v) => setAkida(v)}
					/>
					<CustomInput
						value={convertMuslim}
						disabled
						onPressIn={() => setIsConvertMuslim(true)}
						label='convert Muslim'
						setState={(v) => setConvertMuslim(v)}
					/>
					<CustomInput
						value={RegNumbers(appearance.height)}
						label='Height/cm/inch'
						maxLength={3}
						setState={(height) =>
							setAppearance((prev) => ({ ...prev, height }))
						}
					/>
					<CustomInput
						value={RegNumbers(appearance.weight)}
						label='Weight/kg - lbs'
						maxLength={3}
						setState={(weight) =>
							setAppearance((prev) => ({ ...prev, weight }))
						}
					/>
					<CustomInput
						value={originRace}
						label='Your Race'
						disabled
						onPressIn={() => setIsOriginRace(true)}
						setState={(white) => setOriginRace((prev) => ({ ...prev, white }))}
					/>
					<CustomInput
						value={appearance.disability}
						label='Describe short your disability if any'
						setState={(disability) =>
							setAppearance((prev) => ({ ...prev, disability }))
						}
					/>
					<CustomInput
						value={origin.nationality}
						label='Nationality'
						disabled
						onPressIn={() => setIsShowNationality(true)}
						setState={(nationality) =>
							setOrigin((prev) => ({ ...prev, nationality }))
						}
					/>
					<CustomInput
						value={origin.countryOfBirth}
						label='Country Birth'
						disabled
						onPressIn={() => setShowCountries(true)}
						setState={(countryOfBirth) =>
							setOrigin((prev) => ({ ...prev, countryOfBirth }))
						}
					/>
					<CustomInput
						value={origin.countryLiveNow}
						label='Country Live Now'
						disabled
						onPressIn={() => setIsShowCountryLiveNow(true)}
						setState={(countryLiveNow) =>
							setOrigin((prev) => ({ ...prev, countryLiveNow }))
						}
					/>
					<CustomInput
						value={origin.cityLiveNow}
						label='City Live Now - example Chicago'
						setState={(cityLiveNow) =>
							setOrigin((prev) => ({ ...prev, cityLiveNow }))
						}
					/>
					<CustomInput
						value={origin.statusResident}
						disabled
						required
						onPressIn={() => setIsStatus(true)}
						label='Your Status Resident'
						setState={(statusResident) =>
							setOrigin((prev) => ({ ...prev, statusResident }))
						}
					/>
					<CustomInput
						value={career.qualification}
						label='Your qualification'
						setState={(qualification) =>
							setCareer((prev) => ({ ...prev, qualification }))
						}
					/>
					<CustomInput
						value={career.education}
						label='Education'
						setState={(education) =>
							setCareer((prev) => ({ ...prev, education }))
						}
					/>
					<CustomInput
						value={career.jobTitle}
						label='Your current jobTitle'
						setState={(jobTitle) =>
							setCareer((prev) => ({ ...prev, jobTitle }))
						}
					/>
					<CustomInput
						value={career.specialization}
						label='Your specialization'
						setState={(specialization) =>
							setCareer((prev) => ({ ...prev, specialization }))
						}
					/>

					<CustomInput
						value={RegNumbers(incomeMonth)}
						label='Your income month'
						setState={(incomeMonth) => setIncomeMonth(incomeMonth)}
					/>

					<CustomInput
						value={RegNumbers(incomeYear)}
						label='Your income year $'
						setState={(incomeYear) => setIncomeYear(incomeYear)}
					/>
					<CustomInput
						value={description}
						row={10}
						multiline
						height={100}
						label='"About me" max 300'
						maxLength={300}
						setState={(v) => setDescription(v)}
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
