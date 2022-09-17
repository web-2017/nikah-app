import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { userRoute } from '../api/apiRoutes'
import Container from '../components/Container'
import {
	CustomButton,
	CustomInput,
	CustomTitle,
	CustomSnackbar,
} from '../components/ui'

import { UserContext } from '../context/userContext'
import fetchHandler from '../utils/fetchHandler'
import { RegNumbers } from '../utils/filters/regNumbers'

const UserScreen = ({ navigation }) => {
	const [stateUser, setStateUser] = useContext(UserContext)
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [dob, setDob] = useState('')
	const [sex, setSex] = useState('')
	const [profileCreatedBy, setProfileCreatedBy] = useState('')
	const [phone, setPhone] = useState('')
	const [showSnackbar, setShowSnackbar] = useState(false)
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!stateUser) {
			console.log('Error, Your storage data is undefined')
			return
		} else {
			// console.log(123, stateUser)
			setLoading(true)
			setFirstName(stateUser?.user?.firstName)
			setLastName(stateUser?.user?.lastName)
			setSex(stateUser?.user?.sex)
			setEmail(stateUser?.user?.email)
			setDob(stateUser?.user?.dob)
			setPhone(stateUser?.user?.phone?.toString())
			setProfileCreatedBy(stateUser?.user?.profileCreatedBy)
			setLoading(false)
		}
	}, [])

	const fetchUserUpdate = async () => {
		try {
			if (stateUser?.token) {
				setLoading(true)

				const editUser = await fetchHandler.editUser({
					url: userRoute,
					token: stateUser?.token,
					body: {
						email,
						phone,
						profileCreatedBy,
						firstName,
						lastName,
						sex,
						dob,
					},
				})

				setStateUser({ ...stateUser, user: editUser?.user })
				setLoading(false)
				navigation.navigate('Home')
			}
		} catch (error) {
			setMessage('Error update!!!')
			setShowSnackbar(true)
			console.error(error)
			setLoading(false)
		}
	}

	const onDismissSnackBar = () => {
		setShowSnackbar(false)
	}

	return (
		<Container>
			<CustomSnackbar
				onDismissSnackBar={onDismissSnackBar}
				visible={showSnackbar}
			>
				{message}
			</CustomSnackbar>
			<CustomTitle>Edit user: {stateUser?.user?.firstName}</CustomTitle>
			<CustomInput
				label='First name'
				value={firstName}
				setState={setFirstName}
			/>
			<CustomInput label='Last name' value={lastName} setState={setLastName} />
			<CustomInput label='Email' value={email} setState={setEmail} />
			<CustomInput label='Date of birth' value={dob} setState={setDob} />
			<CustomInput
				label='Phone'
				value={RegNumbers(phone)}
				setState={setPhone}
			/>
			<CustomInput label='Male/Female' value={sex} setState={setSex} />
			<CustomInput
				label='Profile created by'
				value={profileCreatedBy}
				setState={setProfileCreatedBy}
			/>
			<CustomButton loading={loading} onPress={() => fetchUserUpdate()}>
				Update user
			</CustomButton>
		</Container>
	)
}

const styles = StyleSheet.create({})

export default UserScreen
