import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Checkbox, useTheme } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import Fontisco from 'react-native-vector-icons/Fontisto'

import Container from '../components/Container'
import { FIELDS } from '../utils/constants'
import { RegNumbers } from '../utils/filters/regNumbers'
import { signUpRoute } from '../api/apiRoutes'

import {
	CustomInput,
	CustomDialog,
	CustomSnackbar,
	CustomButton,
	CustomTitle,
} from '../components/ui'
import CustomText from '../components/ui/CustomText'

const SignUpScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const [email, setEmail] = useState('webdevelope2017@gmail.com')
	const [firstName, setFirstName] = useState('Mario')
	const [lastName, setLastName] = useState('Magomedov')
	const [dob, setDob] = useState('1/2/1984')
	const [password, setPassword] = useState('addqdd')
	const [repeatPassword, setRepeatPassword] = useState('addqdd')
	const [sex, setSex] = useState('Male')
	const [profileCreatedBy, setProfileCreatedBy] = useState('mySelf')
	const [phone, setPhone] = useState('8473127207')

	const [date, setDate] = useState(new Date())
	const [isShow, setIsShow] = useState(true)
	const [showDialog, setShowDialog] = useState(false)
	const [checkedSex, setCheckedSex] = useState(false)
	const [isCreatedShow, setIsCreatedShow] = useState(false)
	const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState('All field are required!!!')

	const showDataHandler = (event, selectedDate) => {
		const currentDate = selectedDate
		setIsShow(true)
		setDate(currentDate)
		setDob(currentDate.toLocaleDateString())
	}

	const fetchData = async () => {
		if (
			!email.trim() ||
			!firstName.trim() ||
			!email.trim() ||
			!phone.trim() ||
			!sex.trim() ||
			!password.trim() ||
			!profileCreatedBy.trim()
		) {
			setMessage('All field are required!!!')
			setVisible(true)
		}

		if (password.length < 5) {
			setMessage('password cannot be less than 6 characters!!!')
			setVisible(true)
		}

		if (password !== repeatPassword) {
			console.log(password)
			console.log(repeatPassword)
			setMessage('Passwords do not match!!!')
			setVisible(true)
		}

		const obj = {
			firstName,
			lastName,
			dob,
			email,
			phone,
			sex,
			password,
			repeatPassword,
			profileCreatedBy,
		}

		// console.log(obj)

		await fetch(`${signUpRoute}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
		})
			.then((json) => json.json())
			.then((data) => {
				setVisible(true)
				setMessage(data.message)

				setFirstName('')
				setLastName('')
				setSex('')
				setPassword('')
				setRepeatPassword('')
				setPhone('')
				setEmail('')
				setProfileCreatedBy('')

				navigation.navigate('Login', { user: { email, password } })
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const onDismissSnackBar = () => setVisible(false)

	return (
		<Container justifyContent='center' flex={1} textAlign='center'>
			{/* modal for choose sex */}

			<CustomDialog
				visible={showDialog}
				onDismiss={() => setShowDialog(!showDialog)}
				title='Select Sex'
				btnText={'Done'}
				onPress={() => setShowDialog(false)}
			>
				{FIELDS.sexField.map((elem, index) => (
					<Checkbox.Item
						key={index}
						color='red'
						label={elem.value}
						uncheckedColor='#000'
						onPress={() => {
							setCheckedSex(!checkedSex)
							setSex(elem.value)
						}}
						status={sex === elem.key ? 'checked' : 'unchecked'}
					/>
				))}
			</CustomDialog>
			{/* modal for choose vali */}

			<CustomDialog
				visible={isCreatedShow}
				onDismiss={() => setIsCreatedShow(!isCreatedShow)}
				title='Who creates?'
				btnText={'Done'}
				onPress={() => setIsCreatedShow(false)}
			>
				{Object.keys(FIELDS.profileCreatedBy).map((elem, index) => (
					<Checkbox.Item
						key={index}
						color='red'
						label={elem}
						uncheckedColor='#000'
						onPress={() => setProfileCreatedBy(elem)}
						status={profileCreatedBy === elem ? 'checked' : 'unchecked'}
					/>
				))}
			</CustomDialog>

			<CustomSnackbar
				visible={visible}
				onDismissSnackBar={onDismissSnackBar}
				location='top'
			>
				{message}
			</CustomSnackbar>

			<CustomTitle textTransform='uppercase' color='tomato'>
				All fields are required!!!
			</CustomTitle>
			<CustomInput
				label='First Name'
				value={firstName}
				setState={setFirstName}
			/>
			<CustomInput label='Last Name' value={lastName} setState={setLastName} />
			<CustomInput label='Email' value={email} setState={setEmail} />
			<CustomInput
				label='Phone'
				value={RegNumbers(phone)}
				setState={setPhone}
			/>
			<CustomInput
				label='Sex'
				value={sex}
				setState={setSex}
				disabled
				onPressIn={() => setShowDialog(true)}
			/>
			{isShow ? (
				<CustomInput
					label={'Date of birth - 9/21/1990'}
					value={dob}
					disabled={!dob}
					onPressIn={!dob ? () => setIsShow(!isShow) : null}
					right={
						<TextInput.Icon
							onPress={() => setIsShow(!isShow)}
							icon={() => <Fontisco name='date' size={20} />}
						/>
					}
					setState={setDob}
				/>
			) : (
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<DateTimePicker
						style={{
							flex: 1,
							height: 70,
						}}
						testID='dateTimePicker'
						value={date}
						mode={'date'}
						onChange={showDataHandler}
					/>
				</View>
			)}
			<CustomInput
				label='Password'
				value={password}
				setState={setPassword}
				secureTextEntry
			/>
			<CustomInput
				label='Repeat Password'
				value={repeatPassword}
				setState={setRepeatPassword}
				secureTextEntry
			/>
			<CustomInput
				label='Profile Created By'
				disabled
				placeholder='Who is your vali'
				value={profileCreatedBy}
				onPressIn={() => setIsCreatedShow(true)}
				setState={setProfileCreatedBy}
			/>
			<CustomText
				style={{
					fontSize: 16,
					textAlign: 'center',
					marginVertical: 5,
					color: colors.blue,
				}}
				onPress={() => navigation.navigate('Login')}
			>
				Already have account? go to Log In
			</CustomText>
			<CustomButton onPress={() => fetchData()}>Sign Up</CustomButton>
		</Container>
	)
}

export default SignUpScreen
