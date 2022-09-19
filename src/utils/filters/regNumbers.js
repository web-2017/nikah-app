export const RegNumbers = (value) => {
	if (!value) return
	return value.replace(/[^0-9]/g, '')
}
