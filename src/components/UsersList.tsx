import React, { FC } from 'react'
import { FlatList } from 'react-native'

import { UsersItem } from './UsersItem'

interface IUserListProps {
	users: []
	renderItem: []
	_id: string
	getCurrentProfile: Function
}

const UsersList: FC<IUserListProps> = ({ users, getCurrentProfile }) => {
	return (
		<FlatList
			data={users}
			renderItem={({ item }) => (
				<UsersItem item={item} getCurrentProfile={getCurrentProfile} />
			)}
			keyExtractor={(item: any) => item._id}
		/>
	)
}

export default UsersList
