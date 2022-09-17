export const RegNumbers = (value) => {
	if (!value) return
	return value.toString().replace(/[^0-9]/g, '')
}
