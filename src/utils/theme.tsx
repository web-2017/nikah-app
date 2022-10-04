import { DefaultTheme } from 'react-native-paper'
import { IColors } from '../types/types'

export interface ITheme {
	colors: IColors
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
