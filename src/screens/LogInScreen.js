import React, { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from 'react-native-paper'

import { setUser, setLoading } from '../redux/reducer/userSlice'
import Container from '../components/Container'
import fetchHandler from '../utils/fetchHandler'
import {
	CustomInput,
	CustomSnackbar,
	CustomButton,
	CustomTitle,
} from '../components/ui'
import { FIELDS } from '../utils/constants'
import { signInRoute } from '../api/apiRoutes'
import { getData, setData } from '../utils/storeData'
import CustomText from '../components/ui/CustomText'
import { UserContext } from '../context/userContext'

const fakeUser = {
	email: 'webdevelope2017@gmail.com',
	password: 'addqdd',
}

const LogInScreen = ({ route, navigation }) => {
	const [stateUser, setStateUser] = useContext(UserContext)
	const { colors } = useTheme()
	const [email, setEmail] = useState(
		process.env.NODE_ENV === 'development' ? fakeUser.email : ''
	)
	const [password, setPassword] = useState(
		process.env.NODE_ENV === 'development' ? fakeUser.password : ''
	)
	const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState('')

	const { user, loading } = useSelector((state) => state.user)

	const dispatch = useDispatch()

	useEffect(() => {
		if (route?.params?.user?.email) {
			setEmail(route?.params?.user?.email)
			setPassword(route?.params?.user?.password)
		}
	}, [route?.params?.user?.email])

	useEffect(() => {
		;(async () => {
			const getUser = await getData('user')
			const parseUser = JSON.parse(getUser)
			// AsyncStorage.clear()
			if (parseUser) {
				setEmail(parseUser?.user?.email)
			}
		})()
	}, [route])

	const onDismissSnackBar = () => setVisible(false)

	const fetchData = async () => {
		dispatch(setLoading(true))

		try {
			const data = await fetchHandler.logIn({
				url: signInRoute,
				data: { email, password },
			})

			dispatch(setUser(data))
			dispatch(setLoading(false))
			setStateUser(data)
			setMessage(`Welcome ${data?.user?.firstName}`)
			setVisible(true)
			setData({ name: 'user', data })
		} catch (error) {
			dispatch(setLoading(false))
			console.log(error)
		}

		// await fetch(`${signInRoute}`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({ email, password }),
		// })
		// 	.then((json) => json.json())
		// 	.then((data) => {
		// 		dispatch(setUser({ user: { ...data } }))
		// 		dispatch(setLoading(false))
		// 		setMessage(`Welcome ${data?.user?.firstName}`)
		// 		setVisible(true)
		// 		setData({ name: 'user', data: data })
		// 	})
		// 	.catch((err) => {
		// 		dispatch(setLoading(false))
		// 		console.log(err)
		// 	})
	}

	return (
		<Container
			alignContent='center'
			style={{
				flex: 1,
				justifyContent: 'center',
				paddingBottom: 0,
				marginVertical: 0,
				marginHorizontal: 10,
			}}
			textAlign='center'
		>
			<CustomTitle>{FIELDS.brandName.logo}</CustomTitle>
			<CustomSnackbar
				location='top'
				onDismissSnackBar={onDismissSnackBar}
				visible={visible}
			>
				{message}
			</CustomSnackbar>
			<CustomInput label='Email' value={email} setState={setEmail} />
			<CustomInput
				label='Password'
				secureTextEntry
				value={password}
				setState={setPassword}
			/>
			<CustomText
				style={{
					fontSize: 16,
					textAlign: 'center',
					marginVertical: 5,
					color: colors.blue,
				}}
				onPress={() => navigation.navigate('Signup')}
			>
				Don't have account yet? go to Sign Up
			</CustomText>
			<CustomButton
				loading={loading}
				mode='contained'
				style={{ justifyContent: 'center' }}
				onPress={() => fetchData()}
			>
				Sign In
			</CustomButton>
		</Container>
	)
}

export default LogInScreen
