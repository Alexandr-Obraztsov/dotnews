import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/model'
import { LoadingDigest } from './loading-digest/LoadingDigest'
import { Digest as DigestType } from '@/entities/digest/model/types'
import { Digest } from '../digest/Digest'

type Props = {
	digests: DigestType[] | undefined
}

export const MyDigests = ({ digests }: Props) => {
	const router = useRouter()

	useEffect(() => {
		if (digests)
			digests.forEach(digest => {
				router.prefetch(PATH.digest.replace(':id', digest.id))
			})
	}, [digests, router])

	return (
		<div>
			<span className='text-primary text-lg font-bold tracking-wide'>
				Digests
			</span>
			<div className='flex flex-col gap-3 mt-2'>
				{digests?.length ? (
					digests?.map(digest => <Digest key={digest.id} {...digest} />)
				) : (
					<LoadingDigest />
				)}
			</div>
		</div>
	)
}
