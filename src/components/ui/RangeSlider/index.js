import React, { useCallback, useState } from 'react'
import RangeSliderRN from 'rn-range-slider'
import { View, Text } from 'react-native'

import Label from './Label'
import Notch from './Notch'
import Rail from './Rail'
import RailSelected from './RailSelected'
import Thumb from './Thumb'
import { useTheme } from 'react-native-paper'

const RangeSlider = ({ from, to, setAge, style }) => {
	const { colors } = useTheme()
	const [low, setLow] = useState(from)
	const [high, setHigh] = useState(to)

	const renderThumb = useCallback(() => <Thumb />, [])
	const renderRail = useCallback(() => <Rail />, [])
	const renderRailSelected = useCallback(() => <RailSelected />, [])
	const renderLabel = useCallback((value) => <Label text={value} />, [])
	const renderNotch = useCallback(() => <Notch />, [])

	const handleValueChange = useCallback(
		(newLow, newHigh) => {
			setLow(newLow)
			setHigh(newHigh)
			setAge({ min: newLow, max: newHigh })
		},
		[setLow, setHigh]
	)

	return (
		<>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					marginVertical: 10,
					...style,
				}}
			>
				<View>
					<Text
						style={[
							{ fontStyle: 'italic' },
							{ textAlign: 'left', fontSize: 14, color: colors.accent },
						]}
					>
						Min
					</Text>
					<Text
						style={[
							{ fontWeight: 'bold' },
							{ fontSize: 16, color: colors.primary },
						]}
					>
						{low} Age
					</Text>
				</View>
				<View>
					<Text
						style={[
							{ fontStyle: 'italic' },
							{ textAlign: 'right', fontSize: 14, color: colors.accent },
						]}
					>
						Max
					</Text>
					<Text
						style={[{ fontWeight: 'bold' }, { fontSize: 16, color: '#000000' }]}
					>
						{high} Age
					</Text>
				</View>
			</View>
			<RangeSliderRN
				style={{ ...style }}
				min={from}
				max={to}
				step={1}
				floatingLabel
				renderThumb={renderThumb}
				renderRail={renderRail}
				renderRailSelected={renderRailSelected}
				renderLabel={renderLabel}
				renderNotch={renderNotch}
				onValueChanged={handleValueChange}
			/>
		</>
	)
}

export default RangeSlider
