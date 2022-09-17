import AsyncStorage from '@react-native-async-storage/async-storage'

export const setData = async ({ name, data }) => {
	if (!name || !data) return console.log(`You should pass name and data`)
	try {
		const jsonValue = JSON.stringify({ ...data })
		await AsyncStorage.setItem(name, jsonValue)
	} catch (e) {
		// saving error
		console.error(e)
	}
}

export const getData = async (name = 'user') => {
	if (!name) return console.log(`You should pass name`)
	try {
		return await AsyncStorage.getItem(name)
	} catch (e) {
		// saving error
		console.error(e)
	}
}
