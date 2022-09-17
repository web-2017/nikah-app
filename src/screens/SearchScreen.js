import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Searchbar, List, useTheme } from 'react-native-paper'

import Container from '../components/Container'
import CustomText from '../components/ui/CustomText'
import fetchHandler from '../utils/fetchHandler'
import { profilesRoute } from '../api/apiRoutes'
import { UserContext } from '../context/userContext'

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

const SearchScreen = () => {
	const { colors } = useTheme()
	const [searchQuery, setSearchQuery] = useState('')
	const [stateUser, setStateUser] = useContext(UserContext)
	const [posts, setPosts] = useState([
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
	])
	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = async () => {
		try {
			const response = await fetchHandler.getAllDataHandler({
				url: profilesRoute,
				token: stateUser?.token,
			})

			console.log(response)
		} catch (error) {
			// throw new Error('Error fetch posts', { cause: error })
			console.log(error)
		}
	}

	const renderItem = ({ item }) => (
		<List.Item
			title='Second Item'
			left={() => <List.Icon color={colors.gray} icon='folder' />}
		/>
	)

	return (
		<View style={{ marginHorizontal: 5 }}>
			<FlatList
				data={posts}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
			<List.Subheader>Some title</List.Subheader>
		</View>
	)
}

const styles = StyleSheet.create({})

export default SearchScreen
