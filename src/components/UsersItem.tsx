import React, { FC } from 'react'
import { List, TouchableRipple, useTheme } from 'react-native-paper'
import { Fontisto } from 'react-native-vector-icons'

import { ConvertTime } from '../utils/filters/convertTime'

interface IProps {
	item: {
		firstName: string
		lastName: string
		_id: string
		dob: string
	}
	getCurrentProfile: Function
}

export const UsersItem: FC<IProps> = ({ item, getCurrentProfile }) => {
	const { colors } = useTheme()
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
