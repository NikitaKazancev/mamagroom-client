import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
		colors: {
			white: '#ffffff',
			light: '#e7e7e7',
			black: '#000000',
			dark: '#151515',
			transparent: 'transparent',
			gray: {
				50: '#F7FAFC',
				100: '#EDF2F7',
				200: '#E2E8F0',
				300: '#CBD5E0',
				400: '#A0AEC0',
				500: '#718096',
				600: '#4A5568',
				700: '#1f2733',
				800: '#1A202C',
				900: '#171923',
			},
			red: {
				25: '#FFF9F9',
				50: '#FFF5F5',
				100: '#FED7D7',
				200: '#FEB2B2',
				300: '#FC8181',
				400: '#F56565',
				500: '#E53E3E',
				600: '#C53030',
				700: '#9B2C2C',
				800: '#822727',
				900: '#63171B',
			},
			orange: {
				50: '#FFFAF0',
				100: '#FEEBC8',
				200: '#FBD38D',
				300: '#F6AD55',
				400: '#ED8936',
				500: '#DD6B20',
				600: '#C05621',
				700: '#9C4221',
				800: '#7B341E',
				900: '#652B19',
			},
			amber: {
				50: '#fffbeb',
				100: '#fef3c7',
				200: '#fde68a',
				300: '#fcd34d',
				400: '#fbbf24',
				500: '#f59e0b',
				600: '#d97706',
				700: '#b45309',
				800: '#92400e',
				900: '#78350f',
			},
			yellow: {
				50: '#FFFFF0',
				100: '#FEFCBF',
				200: '#FAF089',
				300: '#F6E05E',
				400: '#ECC94B',
				500: '#D69E2E',
				600: '#B7791F',
				700: '#975A16',
				800: '#744210',
				900: '#5F370E',
			},
			lime: {
				50: '#f7fee7',
				100: '#ecfccb',
				200: '#d9f99d',
				300: '#bef264',
				400: '#98ec2d',
				500: '#82d616',
				600: '#65a30d',
				700: '#4d7c0f',
				800: '#3f6212',
				900: '#365314',
			},
			green: {
				50: '#F0FFF4',
				100: '#C6F6D5',
				200: '#9AE6B4',
				300: '#68D391',
				400: '#48BB78',
				500: '#38A169',
				600: '#2F855A',
				700: '#276749',
				800: '#22543D',
				900: '#1C4532',
			},
			teal: {
				50: '#E6FFFA',
				100: '#B2F5EA',
				200: '#81E6D9',
				300: '#4FD1C5',
				400: '#38B2AC',
				500: '#319795',
				600: '#2C7A7B',
				700: '#285E61',
				800: '#234E52',
				900: '#1D4044',
			},
			cyan: {
				50: '#EDFDFD',
				100: '#C4F1F9',
				200: '#9DECF9',
				300: '#76E4F7',
				400: '#0BC5EA',
				500: '#00B5D8',
				600: '#00A3C4',
				700: '#0987A0',
				800: '#086F83',
				900: '#065666',
			},
			blue: {
				50: '#ebf8ff',
				100: '#bee3f8',
				200: '#90cdf4',
				300: '#63b3ed',
				400: '#4299e1',
				500: '#3182ce',
				600: '#2b6cb0',
				700: '#2c5282',
				800: '#2a4365',
				900: '#1A365D',
			},
			navy: {
				50: '#d0dcfb',
				100: '#aac0fe',
				200: '#a3b9f8',
				300: '#728fea',
				400: '#3652ba',
				500: '#1b3bbb',
				600: '#24388a',
				700: '#1B254B',
				800: '#111c44',
				900: '#0b1437',
			},
			indigo: {
				50: '#eef2ff',
				100: '#e0e7ff',
				200: '#c7d2fe',
				300: '#a5b4fc',
				400: '#818cf8',
				500: '#6366f1',
				600: '#4f46e5',
				700: '#4338ca',
				800: '#3730a3',
				900: '#312e81',
			},
			purple: {
				50: '#FAF5FF',
				100: '#E9D8FD',
				200: '#D6BCFA',
				300: '#B794F4',
				400: '#9F7AEA',
				500: '#805AD5',
				600: '#6B46C1',
				700: '#553C9A',
				800: '#44337A',
				900: '#322659',
			},
			pink: {
				50: '#FFF5F7',
				100: '#FED7E2',
				200: '#FBB6CE',
				300: '#F687B3',
				400: '#ED64A6',
				500: '#D53F8C',
				600: '#B83280',
				700: '#97266D',
				800: '#702459',
				900: '#521B41',
			},
		},
		// colors: {
		// 	black: '#000000',
		// 	white: '#ffffff',
		// 	whatsapp: '#24924b',
		// 	telegram: '#2b94c1',
		// 	'blue-dark-1': 'hsl(185, 49%, 35%)',
		// 	'blue-dark-2': 'hsl(185, 53%, 29%)',
		// 	'blue-light-1': 'hsl(185, 47%, 64%)',
		// 	'red-light-1': '#fff8f8',
		// },
	},
	plugins: [],
}
export default config
