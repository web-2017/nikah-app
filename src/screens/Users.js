import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { CustomButton } from '../components/ui'
import fetchHandler from '../utils/fetchHandler'
import { allUsersRoute, profilesRoute } from '../api/apiRoutes'
import { UserContext } from '../context/userContext'
import { queryFilters } from '../utils/filters/queryParamsFilter'
import UsersList from '../components/UsersList'

const Users = ({ navigation }) => {
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)
	const [users, setUsers] = useState([])
	// const [isCurrentUser, setIsCurrentUser] = useState(
	// 	stateUser?._id === profile?.postedBy?._id
	// )
	const { filter } = useSelector((state) => state)

	useEffect(() => {
		getUsers()
	}, [])

	const getUsers = async () => {
		try {
			const response = await fetchHandler.getAllDataHandler({
				url: `${allUsersRoute}/?sex=${stateUser?.user?.sex}`,
				token: stateUser?.token,
			})
			setUsers(response)
			// console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	const getCurrentProfile = (profileId) => {
		navigation.navigate('Date', { id: profileId, token: stateUser?.token })
	}

	useEffect(() => {
		console.log('filter', queryFilters(filter))
		filter && fetchSearchQuery(queryFilters(filter))
	}, [filter])

	const fetchSearchQuery = async (param) => {
		const response = await fetchHandler.getAllDataHandler({
			url: `${profilesRoute}?${param}`,
			token: stateUser?.token,
		})

		console.log('response', response)
	}

	return (
		<View style={{ marginHorizontal: 5 }}>
			<CustomButton
				icon='filter'
				color={colors.blue}
				onPress={() => navigation.navigate('Filter')}
			>
				Filter
			</CustomButton>
			<UsersList users={users} getCurrentProfile={getCurrentProfile} />
		</View>
	)
}

const styles = StyleSheet.create({})

export default Users
