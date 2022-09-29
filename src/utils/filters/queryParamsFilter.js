/**
 * @description parse object to query string
 * @param {*} params Object
 * @returns {String} key=value&key=value
 */

export const queryFilter = (params) => {
	const queryString = Object.entries(params)
		.map((param) => {
			return `${param[0]}=${param[1]}`
		})
		.join('&')

	return queryString
}

export const queryFilters = (params) => {
	return new URLSearchParams(params).toString()
}
