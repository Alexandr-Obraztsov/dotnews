'use client'

import { useWebApp } from '@/app/hooks/useWebApp'
import { useLoginMutation } from '@/features/login/api/loginApi'
import { PATH } from '@/shared/model'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const LoadingPage = () => {
	const [login] = useLoginMutation()
	const router = useRouter()
	const webApp = useWebApp()

	useEffect(() => {
		if (!webApp) return

		localStorage.setItem('tgInitData', webApp.initData)
		login({ timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone })
			.unwrap()
			.then(data => {
				if (!data.firstLogin) {
					router.push(PATH.welcome)
				} else {
					router.push(PATH.digests)
				}
			})
	}, [login, router, webApp])

	return (
		<main className='flex flex-col h-screen w-full justify-center items-center text-black'>
			<span className='animate-spin rounded-full size-20 border-b-2 border-primary'></span>
		</main>
	)
}
