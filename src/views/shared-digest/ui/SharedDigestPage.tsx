'use client'

import {
	useAddSharedDigestMutation,
	useGetSharedDigestQuery,
} from '@/entities/digest/api/digestsApi'
import { useParams, useRouter } from 'next/navigation'
import { Channels } from './channels/Channels'
import { useWebApp } from '@/app/hooks/useWebApp'
import { PATH } from '@/shared/model'
import { useEffect } from 'react'
import { Header } from './header/Header'
import { Button } from '@/shared/ui'
import Plus from 'public/icons/plus.svg'
import { toast } from 'react-toastify'

export const SharedDigestPage = () => {
	const webApp = useWebApp()
	const params = useParams()
	const router = useRouter()
	const id = params.id as string

	const { data: sharedDigest } = useGetSharedDigestQuery({ id })
	const [addSharedDigest] = useAddSharedDigestMutation()

	const handleAddSharedDigest = () => {
		addSharedDigest({ sharedDigestId: id })
			.unwrap()
			.then(() => {
				toast.success('Digest added to My Digests')
				router.push(PATH.digests)
			})
	}

	useEffect(() => {
		router.prefetch(PATH.digests)
	}, [router])

	useEffect(() => {
		if (!webApp) return
		webApp.BackButton.show()
		webApp.BackButton.onClick(() => router.push(PATH.digests))
	}, [webApp, router])

	return (
		<div className='p-4 bg-background flex flex-col gap-4'>
			<Header title={sharedDigest?.name || ''} />
			<Channels sharedDigest={sharedDigest} />
			<Button onClick={handleAddSharedDigest}>
				<Plus />
				Add to My Digests
			</Button>
		</div>
	)
}
