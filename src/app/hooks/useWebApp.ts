'use client'

import { mockTgData } from '@/shared/model'
import { useEffect, useState } from 'react'

type WebAppType = typeof import('@twa-dev/sdk').default

export const useWebApp = () => {
	const [webApp, setWebApp] = useState<WebAppType>()

	useEffect(() => {
		const loadTelegramWebApp = async () => {
			if (typeof window !== 'undefined') {
				const WebApp = (await import('@twa-dev/sdk')).default

				setWebApp(
					WebApp.initData ? WebApp : (mockTgData as unknown as WebAppType)
				)
			}
		}

		loadTelegramWebApp()
	}, [])

	return webApp
}
