'use client'

import { useLoginMutation } from '@/features/login/api/loginApi'
import { mockTgData, PATH } from '@/shared/model'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const LoadingPage = () => {
	const [login] = useLoginMutation()
	const router = useRouter()
	const [tgData, setTgData] = useState('')

	useEffect(() => {
		const loadTelegramWebApp = async () => {
			if (typeof window !== 'undefined') {
				const WebApp = (await import('@twa-dev/sdk')).default

				setTgData(WebApp.initData || 'Data not found')
				const initData = WebApp.initData || mockTgData.initData
				localStorage.setItem('tgInitData', initData)
			}
		}

		loadTelegramWebApp().then(() => {
			login({ timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone })
				.unwrap()
				.then(data => {
					if (data.firstLogin) {
						router.push(PATH.welcome)
					} else {
						router.push(PATH.digests)
					}
				})
		})
	}, [login, router])

	return (
		<main className='flex flex-col h-screen w-full justify-center items-center text-black'>
			<span className='animate-spin rounded-full size-20 border-b-2 border-primary'></span>
			<span className='text-wrap w-full'>{tgData}</span>
		</main>
	)
}
