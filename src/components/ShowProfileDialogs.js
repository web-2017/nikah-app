import React from 'react'
import { View, ScrollView } from 'react-native'
import { Checkbox } from 'react-native-paper'

import { FIELDS, COUNTRIES, NATIONALITY } from '../utils/constants'
import { CustomDialog } from './ui'

const ShowProfileDialogs = ({
	isOriginRace,
	setIsOriginRace,
	originRace,
	setOriginRace,
	isConvertMuslim,
	familyStatus,
	setFamilyStatus,
	isFamilyStatus,
	setIsFamilyStatus,
	convertMuslim,
	setConvertMuslim,
	setIsConvertMuslim,
	setOrigin,
	origin,
	showCountries,
	setShowCountries,
	levelOfFaith,
	setLevelOfFaith,
	isLevelOfFaith,
	setIsLevelOfFaith,
	isWannaKidsMore,
	setIsWannaKidsMore,
	wannaKidsMore,
	setWannaKidsMore,
	isShowNationality,
	setIsShowNationality,
	setIsShowCountryLiveNow,
	isShowCountryLiveNow,
	isStatus,
	setIsStatus,
	isAkida,
	akida,
	setAkida,
	setIsAkida,
}) => {
	return (
		<View>
			{isOriginRace && (
				<CustomDialog
					visible={isOriginRace}
					onDismiss={() => setIsOriginRace(!isOriginRace)}
					title='Origin'
					btnText={'Save'}
					onPress={() => setIsOriginRace(false)}
				>
					{FIELDS.originRace.map((elem, index) => (
						<Checkbox.Item
							key={index}
							color='red'
							label={elem.value}
							uncheckedColor='#000'
							onPress={() => {
								setIsOriginRace(false)
								setOriginRace(elem.value)
							}}
							status={originRace === elem.key ? 'checked' : 'unchecked'}
						/>
					))}
				</CustomDialog>
			)}
			{isAkida && (
				<CustomDialog
					visible={isAkida}
					onDismiss={() => setIsAkida(!isAkida)}
					title='Akida'
					btnText={'Save'}
					onPress={() => setIsAkida(false)}
				>
					{FIELDS.akida.map((elem, index) => (
						<Checkbox.Item
							key={index}
							color='red'
							label={elem.value}
							uncheckedColor='#000'
							onPress={() => {
								setIsAkida(false)
								setAkida(elem.value)
							}}
							status={akida === elem.key ? 'checked' : 'unchecked'}
						/>
					))}
				</CustomDialog>
			)}
			{isShowNationality && (
				<CustomDialog
					visible={isShowNationality}
					onDismiss={() => setIsShowNationality(!visible)}
					title='Nationality'
					btnText={'Save'}
					onPress={() => setIsShowNationality(false)}
				>
					<ScrollView>
						{NATIONALITY.map((elem, index) => (
							<Checkbox.Item
								key={index}
								color='red'
								label={elem.en_short_name}
								uncheckedColor='#000'
								onPress={() => {
									setIsShowNationality(false)
									setOrigin((prev) => ({
										...prev,
										nationality: elem.en_short_name,
									}))
								}}
								status={
									origin.nationality === elem.en_short_name
										? 'checked'
										: 'unchecked'
								}
							/>
						))}
					</ScrollView>
				</CustomDialog>
			)}
			{isStatus && (
				<CustomDialog
					visible={isStatus}
					onDismiss={() => setIsStatus(!isStatus)}
					title='Resident Status'
					btnText={'Save'}
					onPress={() => setIsStatus(false)}
				>
					<ScrollView>
						{FIELDS.statusResident.map((elem, index) => (
							<Checkbox.Item
								key={index}
								color='red'
								label={elem.value}
								uncheckedColor='#000'
								onPress={() => {
									setIsStatus(false)
									setOrigin((prev) => ({
										...prev,
										statusResident: elem.value,
									}))
								}}
								status={
									origin.statusResident === elem.key ? 'checked' : 'unchecked'
								}
							/>
						))}
					</ScrollView>
				</CustomDialog>
			)}
			{isShowCountryLiveNow && (
				<CustomDialog
					visible={isShowCountryLiveNow}
					onDismiss={() => setIsShowCountryLiveNow(!isShowCountryLiveNow)}
					title='Show Country Live Now'
					btnText={'Save'}
					onPress={() => setIsShowCountryLiveNow(false)}
				>
					<ScrollView>
						{COUNTRIES.map((elem, index) => (
							<Checkbox.Item
								key={index}
								color='red'
								label={elem.value}
								uncheckedColor='#000'
								onPress={() => {
									setIsShowCountryLiveNow(false)
									setOrigin((prev) => ({
										...prev,
										countryLiveNow: elem.value,
									}))
								}}
								status={
									origin.countryLiveNow === elem.value ? 'checked' : 'unchecked'
								}
							/>
						))}
					</ScrollView>
				</CustomDialog>
			)}
			{isConvertMuslim && (
				<CustomDialog
					visible={isConvertMuslim}
					onDismiss={() => setIsConvertMuslim(!convertMuslim)}
					title='Convert Muslim'
					btnText={'Save'}
					onPress={() => setIsConvertMuslim(false)}
				>
					{Object.keys(FIELDS.convertMuslim).map((elem, index) => (
						<Checkbox.Item
							key={index}
							color='red'
							label={elem}
							uncheckedColor='#000'
							onPress={() => {
								setIsConvertMuslim(false)
								setConvertMuslim(elem)
							}}
							status={convertMuslim === elem ? 'checked' : 'unchecked'}
						/>
					))}
				</CustomDialog>
			)}
			{isFamilyStatus && (
				<CustomDialog
					visible={isFamilyStatus}
					onDismiss={() => setIsFamilyStatus(!isFamilyStatus)}
					title='Family Status'
					btnText={'Save'}
					onPress={() => setIsFamilyStatus(false)}
				>
					{FIELDS.familyStatus.map((elem, index) => (
						<Checkbox.Item
							key={index}
							color='red'
							label={elem.value}
							uncheckedColor='#000'
							onPress={() => {
								setIsFamilyStatus(false)
								setFamilyStatus(elem.value)
							}}
							status={familyStatus === elem.key ? 'checked' : 'unchecked'}
						/>
					))}
				</CustomDialog>
			)}
			{isWannaKidsMore && (
				<CustomDialog
					visible={isWannaKidsMore}
					onDismiss={() => setIsWannaKidsMore(!isWannaKidsMore)}
					title='Wanna kids more'
					btnText={'Save'}
					onPress={() => setIsWannaKidsMore(false)}
				>
					{FIELDS.wannaKidsMore.map((elem, index) => (
						<Checkbox.Item
							key={index}
							color='red'
							label={elem.value}
							uncheckedColor='#000'
							onPress={() => {
								setIsWannaKidsMore(false)
								setWannaKidsMore(elem.key)
							}}
							status={wannaKidsMore === elem.key ? 'checked' : 'unchecked'}
						/>
					))}
				</CustomDialog>
			)}
			{isLevelOfFaith && (
				<CustomDialog
					visible={isLevelOfFaith}
					onDismiss={() => setIsLevelOfFaith(!isLevelOfFaith)}
					title='Your faith level'
					btnText={'Save'}
					onPress={() => setIsLevelOfFaith(false)}
				>
					{FIELDS.levelOfFaith.map((elem, index) => (
						<Checkbox.Item
							key={index}
							color='red'
							label={elem.value}
							uncheckedColor='#000'
							onPress={() => {
								setIsLevelOfFaith(false)
								setLevelOfFaith(elem.key)
							}}
							status={levelOfFaith === elem.key ? 'checked' : 'unchecked'}
						/>
					))}
				</CustomDialog>
			)}
			{showCountries && (
				<CustomDialog
					visible={showCountries}
					onDismiss={() => setShowCountries(!showCountries)}
					title='Your country of birth'
					btnText={'Save'}
					onPress={() => setShowCountries(false)}
				>
					<ScrollView>
						{COUNTRIES.map((elem, index) => (
							<Checkbox.Item
								key={index}
								color='red'
								label={elem.value}
								uncheckedColor='#000'
								onPress={() => {
									setShowCountries(false)
									setOrigin((prev) => ({ ...prev, countryOfBirth: elem.value }))
								}}
								status={
									origin.countryOfBirth === elem.value ? 'checked' : 'unchecked'
								}
							/>
						))}
					</ScrollView>
				</CustomDialog>
			)}
		</View>
	)
}

export default ShowProfileDialogs
