import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";

import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
	darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|input|modal|pagination|spinner|ripple).js"
  ],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
		},
		screens: {
			xs: '475px',
			...defaultTheme.screens,
		},
		container: {
			center: true,
			padding: '4rem'
		}
	},
	plugins: [require("daisyui"), require("tailwind-scrollbar"), require("tailwindcss-animate"), nextui()],
};
export default config;
