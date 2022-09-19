import React, { useState, useCallback } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Switch, useTheme } from 'react-native-paper'
import RangeSlider from '../components/ui/RangeSlider/'

import Container from '../components/Container'
import {
	CustomButton,
	CustomInput,
	CustomText,
	CustomTitle,
} from '../components/ui'
import { RegNumbers } from '../utils/filters/regNumbers'

const FilterScreen = () => {
	const [age, setAge] = useState({ min: 18, max: 60 })
	const [from, setFrom] = useState(18)
	const [to, setTo] = useState(60)
	const [familyStatus, setFamilyStatus] = useState('')
	const [wannaKidsMore, setWannaKidsMore] = useState('yes')
	const [isSwitchOn, setIsSwitchOn] = useState(true)
	const [levelOfFaith, setLevelOfFaith] = useState('')
	const [convertMuslim, setConvertMuslim] = useState('')
	const [isMuslim, setIsMuslim] = useState(true)
	const [akida, setAkida] = useState('')
	const [language, setLanguage] = useState('')
	const [originRace, setOriginRace] = useState('')
	const [height, setHeight] = useState('')
	const [weight, setWeight] = useState('')
	const [nationality, setNationality] = useState('')
	const [cityLiveNow, setCityLiveNow] = useState('')
	const [countryLiveNow, setCountryLiveNow] = useState('')

	const { colors } = useTheme()

	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

	const setFilter = () => {
		console.log(1)
	}

	return (
		<Container>
			<CustomTitle style={{ marginTop: 20 }}>Возраст</CustomTitle>
			<RangeSlider
				from={from}
				to={to}
				setAge={setAge}
				style={{ marginHorizontal: 20 }}
			/>
			<View style={{ ...styles.rowMargin, textAlign: 'center' }}>
				<CustomText style={{ textAlign: 'center', marginBottom: 10 }}>
					Хотите больше детей?
				</CustomText>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<CustomText style={{ alignSelf: 'center', paddingRight: 20 }}>
						{isSwitchOn ? 'yes' : 'no'}
					</CustomText>
					<Switch
						value={isSwitchOn}
						onValueChange={(v) => {
							setIsSwitchOn(!isSwitchOn)
							setWannaKidsMore(isSwitchOn ? 'yes' : 'no')
						}}
					/>
				</View>
			</View>
			<View style={{ ...styles.rowMargin, textAlign: 'center' }}>
				<CustomText style={{ textAlign: 'center', marginBottom: 10 }}>
					Вы мусульманин с рождения?
				</CustomText>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<CustomText style={{ alignSelf: 'center', paddingRight: 20 }}>
						{isMuslim ? 'yes' : 'no'}
					</CustomText>
					<Switch
						value={isMuslim}
						onValueChange={(v) => {
							setIsMuslim(!isMuslim)
							setConvertMuslim(isMuslim ? 'yes' : 'no')
						}}
					/>
				</View>
			</View>
			<View
				style={{
					...styles.rowMargin,
					flexDirection: 'row',
					justifyContent: 'space-around',
				}}
			>
				<CustomInput
					maxLength={3}
					style={{ flex: 3, margin: 3 }}
					label='Height'
					value={RegNumbers(height)}
					setState={setHeight}
				/>
				<CustomInput
					maxLength={3}
					style={{ flex: 3, margin: 3 }}
					label='Weight'
					value={RegNumbers(weight)}
					setState={setWeight}
				/>
				<CustomInput
					style={{ flex: 3, margin: 3 }}
					label='Language'
					value={language}
					setState={setLanguage}
				/>
			</View>
			<View
				style={{
					...styles.rowMargin,
					flexDirection: 'row',
					justifyContent: 'space-around',
				}}
			>
				<CustomInput
					style={{ flex: 3, margin: 3 }}
					label='Nationality'
					value={nationality}
					setState={setNationality}
				/>
				<CustomInput
					style={{ flex: 3, margin: 3 }}
					label='Family Status'
					value={familyStatus}
					setState={setFamilyStatus}
				/>
			</View>
			<View
				style={{
					...styles.rowMargin,
					flexDirection: 'row',
					justifyContent: 'space-around',
				}}
			>
				<CustomInput
					style={{ flex: 3, margin: 3 }}
					label='Where do you live now?'
					value={cityLiveNow}
					setState={setCityLiveNow}
				/>
				<CustomInput
					style={{ flex: 3, margin: 3 }}
					label='Country Live Now ?'
					value={countryLiveNow}
					setState={setCountryLiveNow}
				/>
			</View>
			<View
				style={{
					...styles.rowMargin,
					flexDirection: 'row',
					justifyContent: 'space-around',
				}}
			>
				<CustomInput
					style={{ flex: 3, margin: 3 }}
					label='Akida'
					value={akida}
					setState={setAkida}
				/>
				<CustomInput
					style={{ flex: 3, margin: 3 }}
					label='Origin race ?'
					value={originRace}
					setState={setOriginRace}
				/>
			</View>

			<CustomButton color={colors.blue} onPress={setFilter}>
				Search
			</CustomButton>
		</Container>
	)
}

const styles = StyleSheet.create({
	rowMargin: {
		marginVertical: 5,
	},
})

export default FilterScreen
