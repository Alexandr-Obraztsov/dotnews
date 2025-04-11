'use client'

import { useWebApp } from '@/app/hooks/useWebApp'
import { useLoginMutation } from '@/features/login/api/loginApi'
import { PATH } from '@/shared/model'
import { Loading } from '@/shared/ui/loading/Loading'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const LoadingPage = () => {
	const [login] = useLoginMutation()
	const router = useRouter()
	const webApp = useWebApp()

	useEffect(() => {
		if (!webApp) return
		webApp.ready()
		webApp.expand()

		localStorage.setItem('tgInitData', webApp.initData)
		login({ timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone })
			.unwrap()
			.then(data => {
				if (webApp.initDataUnsafe.start_param)
					router.push(
						PATH.sharedDigest.replace(':id', webApp.initDataUnsafe.start_param)
					)
				else if (data.firstLogin) {
					router.push(PATH.welcome)
				} else {
					router.push(PATH.digests)
				}
			})
			.catch(() => toast.error('Error while logging in'))
	}, [login, router, webApp])

	return <Loading />
}
