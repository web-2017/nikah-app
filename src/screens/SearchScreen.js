import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import {
	Searchbar,
	List,
	useTheme,
	Switch,
	TouchableRipple,
} from 'react-native-paper'
import { Fontisto } from 'react-native-vector-icons'

import CustomText from '../components/ui/CustomText'
import fetchHandler from '../utils/fetchHandler'
import { allUsersRoute } from '../api/apiRoutes'
import { UserContext } from '../context/userContext'
import { ConvertTime } from '../utils/filters/convertTime'

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
	},
]

const SearchScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const [stateUser, setStateUser] = useContext(UserContext)
	const [users, setUsers] = useState([])
	const [isSwitchOn, setIsSwitchOn] = React.useState(false)
	useEffect(() => {
		getUsers()
	}, [])

	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

	const getUsers = async () => {
		try {
			const response = await fetchHandler.getAllDataHandler({
				url: `${allUsersRoute}/?sex=${stateUser?.user?.sex}`,
				token: stateUser?.token,
			})
			setUsers(response)
			console.log(response)
		} catch (error) {
			// throw new Error('Error fetch posts', { cause: error })
			console.log(error)
		}
	}

	const getCurrentProfile = (profileId) => {
		navigation.navigate('Date', { id: profileId })
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
			<View style={{ flexDirection: 'row' }}>
				<CustomText style={{ alignSelf: 'center' }}>
					{isSwitchOn ? 'yes' : 'no'}
				</CustomText>
				<Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
			</View>
			<FlatList
				data={users}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
			/>
			<List.Subheader>Some title</List.Subheader>
		</View>
	)
}

const styles = StyleSheet.create({})

export default SearchScreen
