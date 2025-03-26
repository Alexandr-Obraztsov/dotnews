'use client'

import { mockTgData } from '@/shared/model'
import { useEffect, useState } from 'react'

export const useWebApp = () => {
	const [webApp, setWebApp] = useState<typeof import('@twa-dev/sdk').default>()

	useEffect(() => {
		const loadTelegramWebApp = async () => {
			if (typeof window !== 'undefined') {
				const WebApp = (await import('@twa-dev/sdk')).default

				setWebApp(WebApp.initData ? WebApp : (mockTgData as typeof WebApp))
			}
		}

		loadTelegramWebApp()
	}, [])

	return webApp
}
