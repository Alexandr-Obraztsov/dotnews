'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useWebApp } from '../hooks/useWebApp'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const webApp = useWebApp()

	useEffect(() => {
		if (!webApp) return
		const theme = webApp.colorScheme
		window.document.body.dataset.theme = theme
		webApp.onEvent('themeChanged', () => {
			window.document.body.dataset.theme = webApp.colorScheme
		})
	}, [webApp])

	if (!webApp) return null
	return children
}
