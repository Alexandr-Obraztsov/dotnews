'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useWebApp } from '../hooks/useWebApp'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const webApp = useWebApp()

	useEffect(() => {
		if (!webApp) return

		const handleThemeChange = () => {
			webApp.setHeaderColor(
				webApp.colorScheme === 'light' ? '#ffffff' : '#111827'
			)
			webApp.setBackgroundColor(
				webApp.colorScheme === 'light' ? '#ffffff' : '#111827'
			)

			window.document.body.dataset.theme = webApp.colorScheme
		}

		webApp.safeAreaInset.top = 0
		handleThemeChange()
		webApp.onEvent('themeChanged', () => {
			handleThemeChange()
		})
	}, [webApp])

	if (!webApp) return null
	return children
}
