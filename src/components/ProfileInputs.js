import React from 'react'
import { StyleSheet } from 'react-native'
import { RegNumbers } from '../utils/filters/regNumbers'
import { CustomInput } from './ui'

export const ProfileInputs = ({
	kids,
	setKids,
	familyStatus,
	setFamilyStatus,
	setIsFamilyStatus,
	wannaKidsMore,
	setIsWannaKidsMore,
	setWannaKidsMore,
	languages,
	setLanguages,
	levelOfFaith,
	setLevelOfFaith,
	setIsLevelOfFaith,
	akida,
	setAkida,
	setIsAkida,
	convertMuslim,
	setConvertMuslim,
	setIsConvertMuslim,
	appearance,
	setAppearance,
	origin,
	setOrigin,
	originRace,
	setOriginRace,
	setIsStatus,
	setIsOriginRace,
	setCareer,
	career,
	setShowCountries,
	setIsShowCountryLiveNow,
	setIsShowNationality,
	setIncomeMonth,
	incomeMonth,
	setIncomeYear,
	incomeYear,
	setDescription,
	description,
}) => {
	return (
		<>
			<CustomInput
				value={RegNumbers(kids)}
				label='How many kids?'
				maxLength={2}
				setState={(v) => setKids(v)}
			/>
			<CustomInput
				value={familyStatus}
				label='Family status'
				disabled
				onPressIn={() => setIsFamilyStatus(true)}
				setState={(v) => setFamilyStatus(v)}
			/>
			<CustomInput
				value={wannaKidsMore}
				label='wanna kids more?'
				disabled
				onPressIn={() => setIsWannaKidsMore(true)}
				setState={(v) => setWannaKidsMore(v)}
			/>
			<CustomInput
				value={languages}
				label='What language do you speak?'
				setState={(v) => setLanguages(v)}
			/>
			<CustomInput
				value={levelOfFaith}
				label='level Of Faith'
				disabled
				onPressIn={() => setIsLevelOfFaith(true)}
				setState={(v) => setLevelOfFaith(v)}
			/>
			<CustomInput
				value={akida}
				label='Akida'
				disabled
				onPressIn={() => setIsAkida(true)}
				setState={(v) => setAkida(v)}
			/>
			<CustomInput
				value={convertMuslim}
				disabled
				onPressIn={() => setIsConvertMuslim(true)}
				label='convert Muslim'
				setState={(v) => setConvertMuslim(v)}
			/>
			<CustomInput
				value={RegNumbers(appearance.height)}
				label='Height/cm/inch'
				maxLength={3}
				setState={(height) => setAppearance((prev) => ({ ...prev, height }))}
			/>
			<CustomInput
				value={RegNumbers(appearance.weight)}
				label='Weight/kg - lbs'
				maxLength={3}
				setState={(weight) => setAppearance((prev) => ({ ...prev, weight }))}
			/>
			<CustomInput
				value={originRace}
				label='Your Race'
				disabled
				onPressIn={() => setIsOriginRace(true)}
				setState={(white) => setOriginRace((prev) => ({ ...prev, white }))}
			/>
			<CustomInput
				value={appearance.disability}
				label='Describe short your disability if any'
				setState={(disability) =>
					setAppearance((prev) => ({ ...prev, disability }))
				}
			/>
			<CustomInput
				value={origin.nationality}
				label='Nationality'
				disabled
				onPressIn={() => setIsShowNationality(true)}
				setState={(nationality) =>
					setOrigin((prev) => ({ ...prev, nationality }))
				}
			/>
			<CustomInput
				value={origin.countryOfBirth}
				label='Country Birth'
				disabled
				onPressIn={() => setShowCountries(true)}
				setState={(countryOfBirth) =>
					setOrigin((prev) => ({ ...prev, countryOfBirth }))
				}
			/>
			<CustomInput
				value={origin.countryLiveNow}
				label='Country Live Now'
				disabled
				onPressIn={() => setIsShowCountryLiveNow(true)}
				setState={(countryLiveNow) =>
					setOrigin((prev) => ({ ...prev, countryLiveNow }))
				}
			/>
			<CustomInput
				value={origin.cityLiveNow}
				label='City Live Now - example Chicago'
				setState={(cityLiveNow) =>
					setOrigin((prev) => ({ ...prev, cityLiveNow }))
				}
			/>
			<CustomInput
				value={origin.statusResident}
				disabled
				required
				onPressIn={() => setIsStatus(true)}
				label='Your Status Resident'
				setState={(statusResident) =>
					setOrigin((prev) => ({ ...prev, statusResident }))
				}
			/>
			<CustomInput
				value={career.qualification}
				label='Your qualification'
				setState={(qualification) =>
					setCareer((prev) => ({ ...prev, qualification }))
				}
			/>
			<CustomInput
				value={career.education}
				label='Education'
				setState={(education) => setCareer((prev) => ({ ...prev, education }))}
			/>
			<CustomInput
				value={career.jobTitle}
				label='Your current jobTitle'
				setState={(jobTitle) => setCareer((prev) => ({ ...prev, jobTitle }))}
			/>
			<CustomInput
				value={career.specialization}
				label='Your specialization'
				setState={(specialization) =>
					setCareer((prev) => ({ ...prev, specialization }))
				}
			/>

			<CustomInput
				value={RegNumbers(incomeMonth)}
				label='Your income month'
				setState={(incomeMonth) => setIncomeMonth(incomeMonth)}
			/>

			<CustomInput
				value={RegNumbers(incomeYear)}
				label='Your income year $'
				setState={(incomeYear) => setIncomeYear(incomeYear)}
			/>
			<CustomInput
				value={description}
				row={10}
				multiline
				height={100}
				label='"About me" max 300'
				maxLength={300}
				setState={(v) => setDescription(v)}
			/>
		</>
	)
}
