import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { List, useTheme, TouchableRipple } from 'react-native-paper'
import { Fontisto } from 'react-native-vector-icons'
import { useSelector } from 'react-redux'

import { CustomButton } from '../components/ui'
import fetchHandler from '../utils/fetchHandler'
import { allUsersRoute, profilesRoute } from '../api/apiRoutes'
import { UserContext } from '../context/userContext'
import { ConvertTime } from '../utils/filters/convertTime'
import { queryFilters } from '../utils/filters/queryParamsFilter'

const SearchScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)
	const [users, setUsers] = useState([])
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

	const renderItem = ({ item }) => {
		return (
			<TouchableRipple
				rippleColor='rgba(0, 0, 0, .32)'
				onPress={() => getCurrentProfile(item?._id)}
			>
				<List.Item
					title={`${item?.firstName} ${item?.lastName}`}
					description={`Age: ${ConvertTime({
						mode: 'getCurrentAge',
						time: item?.dob,
					})}`}
					titleStyle={{ color: colors.primary }}
					descriptionStyle={{ color: colors.gray }}
					left={() => (
						<List.Icon
							color={colors.gray}
							icon={() => <Fontisto name='female' size={30} />}
						/>
					)}
				/>
			</TouchableRipple>
		)
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
			<FlatList
				data={users}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
			/>
		</View>
	)
}

const styles = StyleSheet.create({})

export default SearchScreen
