import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Switch } from 'react-native-paper'
import Container from '../components/Container'
import { CustomText } from '../components/ui'

const FilterScreen = () => {
	const [isSwitchOn, setIsSwitchOn] = useState(false)

	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

	return (
		<Container>
			<CustomText>FilterScreen</CustomText>
			<View style={{ flexDirection: 'row' }}>
				<CustomText style={{ alignSelf: 'center' }}>
					{isSwitchOn ? 'yes' : 'no'}
				</CustomText>
				<Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({})

export default FilterScreen
