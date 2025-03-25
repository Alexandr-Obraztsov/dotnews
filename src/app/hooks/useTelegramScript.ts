'use client'

import { useEffect } from 'react'

export const useTelegramScript = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const script = document.createElement('script')
			script.src = 'https://telegram.org/js/telegram-web-app.js?56'
			script.async = true
			script.onload = () => {
				console.log('Telegram WebApp script loaded!')
			}
			document.head.appendChild(script)
		}
	}, [])
}
