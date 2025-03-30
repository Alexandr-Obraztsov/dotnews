'use client'

import { useWebApp } from '@/app/hooks/useWebApp'
import { AddDigestButton } from './add-digest-button/AddDigestButton'
import { MyDigests } from './my-digests/MyDigests'
import { RecommendedDigests } from './recommended-digests/RecommendedDigests'
import { useEffect } from 'react'
import { useGetDigestsQuery } from '@/entities/digest/api/digestsApi'
import { EmptyDigest } from './my-digests/empty-digest/EmptyDigest'
import { ShareAppButton } from './share-app-btn/ShareAppButton'
import { Statistics } from './statistics/Statistics'

export const DigestsPage = () => {
	const webApp = useWebApp()

	const { data: digests, isLoading } = useGetDigestsQuery()

	useEffect(() => {
		if (webApp) {
			webApp.BackButton.hide()
		}
	}, [webApp])

	return (
		<div className='w-full flex flex-col text-primary p-[27px_16px]'>
			{digests?.length || isLoading ? (
				<>
					<MyDigests digests={digests} />
					<Statistics digests={digests} />
				</>
			) : (
				<EmptyDigest />
			)}
			<ShareAppButton />
			<RecommendedDigests />
			<AddDigestButton />
		</div>
	)
}
