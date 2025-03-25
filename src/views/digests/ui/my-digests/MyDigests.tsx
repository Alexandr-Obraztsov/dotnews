import { useGetDigestsQuery } from '@/entities/digest/api/digestsApi'
import { Digest } from '../digest/Digest'
import { EmptyDigest } from './empty-digest/EmptyDigest'

export const MyDigests = () => {
	const { data: digests } = useGetDigestsQuery()

	return (
		<div>
			<span className='text-primary text-[18px] font-[500] leading-[18px]'>
				My Digests
			</span>
			{digests?.length ? (
				<div className='flex flex-wrap w-full gap-4 mt-5'>
					{digests?.map(digest => (
						<Digest key={digest.id} {...digest} />
					))}
				</div>
			) : (
				<EmptyDigest />
			)}
		</div>
	)
}
