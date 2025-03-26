'use client'

import { useWebApp } from '@/app/hooks/useWebApp'
import { AddDigestButton } from './add-digest-button/AddDigestButton'
import { MyDigests } from './my-digests/MyDigests'
import { RecommendedDigests } from './recommended-digests/RecommendedDigests'
import { useEffect } from 'react'

export const DigestsPage = () => {
	const webApp = useWebApp()

	useEffect(() => {
		if (webApp) {
			webApp.BackButton.hide()
		}
	}, [webApp])

	return (
		<div className='w-full flex flex-col text-primary p-[27px_16px]'>
			<MyDigests />
			<RecommendedDigests />
			<AddDigestButton />
		</div>
	)
}
