export interface IUser {
	firstName: string
	lastName: string
	email: string
	uniqUserId: string
	dob: string
	phone: string
	password: string
	sex: string
	profileCreatedBy: string
	createdAt?: string
}

export interface IUserStore {
	user: IUser
	_id: string | number
	token: string
	profile: IProfile
	children: React.ReactNode
}

export interface ICareer {
	qualification: string
	jobTitle: string
	specialization: string
	education: string
}
export interface IOrigin {
	nationality: string
	countryOfBirth: string
	countryLiveNow: string
	cityLiveNow: string
	statusResident: string
}

export interface IAppearance {
	height: string
	weight: string
	disability: string
}

export interface IProfile {
	familyStatus: string
	convertMuslim: string
	email: string
	practicingMuslim: string
	akida: string
	career: ICareer
	description: string
	incomeMonth: number
	incomeYear?: number
	kids: number
	languages: string
	levelOfFaith: string
	origin: IOrigin
	originRace: string
	user?: IUser
	appearance: IAppearance
}
export interface IColors {
	primary: string
	accent: string
	tomato: string
	red: string
	green: string
	yellow: string
	blue: string
	dark: string
	brown: string
	gray: string
	bone: string
}
