import { FIELDS } from './constants'
export const isProcessDev =
	process.env.NODE_ENV === 'development' ? true : false

export const initialProfile = {
	familyStatus: isProcessDev ? FIELDS.familyStatus[0].key : '',
	male: isProcessDev ? FIELDS.sexField[0].value : '',
	female: isProcessDev ? FIELDS.sexField[1].value : '',
	yourRace: isProcessDev ? FIELDS.originRace.white : '',
	wannaKidsMore: isProcessDev ? FIELDS.wannaKidsMore[0].key : '',
	levelOfFaith: isProcessDev ? FIELDS.levelOfFaith[0].key : '',
	convertMuslim: isProcessDev ? FIELDS.convertMuslim.yes : '',
	height: isProcessDev ? '180' : '',
	weight: isProcessDev ? '90' : '',
	disability: isProcessDev ? 'No' : 'No',
	nationality: isProcessDev ? 'Russian' : '',
	countryOfBirth: isProcessDev ? 'Russia' : '',
	countryLiveNow: isProcessDev ? 'USA' : '',
	cityLiveNow: isProcessDev ? 'Chicago' : '',
	statusResident: isProcessDev ? 'Resident' : '',
	qualification: isProcessDev ? 'Teacher' : '',
	jobTitle: isProcessDev ? 'Teacher at college' : '',
	specialization: isProcessDev ? 'Teacher' : '',
	education: isProcessDev ? 'Master degree' : '',
	languages: isProcessDev ? 'English' : '',
	incomeMonth: isProcessDev ? '4000' : '',
	incomeYear: isProcessDev ? '48000' : '',
}
