import moment from 'moment'

export const ConvertTime = ({ mode = 'timeAgo', time }) => {
	if (!time || time == null) {
		// console.log('time props is required')
		return
	}
	if (mode == 'timeAgo') {
		return moment(time, 'YYYYMMDD').fromNow()
	} else if (mode == 'multiple') {
		return moment(time).format('LL')
	} else if (mode == 'getCurrentAge') {
		var today = new Date()
		var birthDate = new Date(time)
		var age = today.getFullYear() - birthDate.getFullYear()
		var m = today.getMonth() - birthDate.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}
		return age
	}
}
