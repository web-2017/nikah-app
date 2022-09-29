export const RegNumbers = (value) => {
	if (!value) return null
	return value && value.toString().replace(/[^0-9]/g, '')
}
