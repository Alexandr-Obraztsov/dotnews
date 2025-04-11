'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useWebApp } from '../hooks/useWebApp'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const webApp = useWebApp()

	useEffect(() => {
		if (!webApp) return

		const handleThemeChange = () => {
			const themeColor = webApp.colorScheme === 'light' ? '#ffffff' : '#1f2937'

			webApp.setHeaderColor(themeColor)
			webApp.setBottomBarColor(themeColor)
			webApp.setBackgroundColor(themeColor)

			window.document.body.dataset.theme = webApp.colorScheme
		}

		handleThemeChange()
		webApp.onEvent('themeChanged', () => {
			handleThemeChange()
		})
	}, [webApp])

	if (!webApp) return null
	return children
}
