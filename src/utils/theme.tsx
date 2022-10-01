import { DefaultTheme } from 'react-native-paper'

interface Colors {
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
interface ITheme {
	colors: Colors
}

export const theme: ITheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#22223b',
		accent: '#d62828',
		tomato: '#e76f51',
		red: '#e63946',
		green: '#2a9d8f',
		yellow: '#fca311',
		blue: '#0081a7',
		dark: '#2b2d42',
		brown: '#bc6c25',
		gray: '#6c757d',
		bone: '#fefae0',
	},
}
