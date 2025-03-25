'use client'

import { useRouter } from 'next/navigation'
import { AddDigestButton } from './add-digest-button/AddDigestButton'
import { MyDigests } from './my-digests/MyDigests'
import { RecommendedDigests } from './recommended-digests/RecommendedDigests'
import { PATH } from '@/shared/model'

export const DigestsPage = () => {
	const router = useRouter()

	const handleAddDigest = () => {
		router.push(PATH.digest.replace(':id', 'new'))
	}

	return (
		<div className='w-full flex flex-col text-primary p-[27px_16px]'>
			<MyDigests />
			<RecommendedDigests />
			<AddDigestButton onClick={handleAddDigest} />
		</div>
	)
}
