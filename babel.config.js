// module.exports = function (api) {
// 	api.cache(true)
// 	return {
// 		presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
// 		plugins: ['react-native-reanimated/plugin'],
// 	}
// }
module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],

		plugins: ['react-native-reanimated/plugin', 'react-native-paper/babel'],
		env: {
			production: {
				plugins: ['react-native-paper/babel'],
			},
		},
	}
}
