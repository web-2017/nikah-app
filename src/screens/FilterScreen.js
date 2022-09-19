import React, { useState, useCallback } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Switch } from 'react-native-paper'
import RangeSlider from '../components/ui/RangeSlider/'

import Container from '../components/Container'
import { CustomText } from '../components/ui'

const FilterScreen = () => {
	const [isSwitchOn, setIsSwitchOn] = useState(false)
	const [age, setAge] = useState({ min: 18, max: 60 })

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

			<RangeSlider from={18} to={80} />
		</Container>
	)
}

const styles = StyleSheet.create({})

export default FilterScreen
