import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				stroke: 'var(--stroke)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				accent: 'var(--accent)',
			},
			animation: {
				up: 'animate-up 0.2s ease-out forwards',
				down: 'animate-down 0.2s ease-out forwards',
				fade: 'animate-fade 0.2s ease-out forwards',
				'fade-out': 'animate-fade-out 0.2s ease-out',
			},
			keyframes: {
				'animate-up': {
					from: {
						transform: 'translateY(100%)',
					},
					to: {
						transform: 'translateY(0)',
					},
				},
				'animate-down': {
					from: {
						transform: 'translateY(0)',
					},
					to: {
						transform: 'translateY(100%)',
					},
				},
				'animate-fade': {
					from: {
						opacity: '0',
					},
					to: {
						opacity: '1',
					},
				},
				'animate-fade-out': {
					from: {
						opacity: '1',
					},
					to: {
						opacity: '0',
					},
				},
			},
		},
	},
	plugins: [],
} satisfies Config
