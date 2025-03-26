import { useGetDigestsQuery } from '@/entities/digest/api/digestsApi'
import { Digest } from '../digest/Digest'
import { EmptyDigest } from './empty-digest/EmptyDigest'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/model'
import { LoadingDigest } from './loading-digest/LoadingDigest'

export const MyDigests = () => {
	const router = useRouter()
	const { data: digests, isLoading } = useGetDigestsQuery()

	useEffect(() => {
		if (digests)
			digests.forEach(digest => {
				router.prefetch(PATH.digest.replace(':id', digest.id))
			})
	}, [digests, router])

	return (
		<div>
			<span className='text-primary text-[18px] font-[500] leading-[18px]'>
				My Digests
			</span>
			{digests?.length || isLoading ? (
				<div className='flex flex-wrap w-full gap-4 mt-5'>
					{isLoading ? (
						<>
							<LoadingDigest />
							<LoadingDigest />
						</>
					) : (
						digests?.map(digest => <Digest key={digest.id} {...digest} />)
					)}
				</div>
			) : (
				<EmptyDigest />
			)}
		</div>
	)
}
