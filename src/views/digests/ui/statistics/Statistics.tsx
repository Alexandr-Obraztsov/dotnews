import { Digest } from '@/entities/digest/model/types'
import DigestSvg from 'public/icons/digest-small.svg'
import ConnectionSvg from 'public/icons/connection.svg'
import Skeleton from 'react-loading-skeleton'

type Props = {
	digests: Digest[] | undefined
}

export const Statistics = ({ digests }: Props) => {
	return (
		<>
			<h1 className='text-primary mt-4 text-lg font-bold tracking-wide'>
				Statistics
			</h1>
			<div className='mt-2 flex flex-row gap-2'>
				<div className='bg-accent-foreground dark:bg-[#1F2937] dark:!bg-opacity-50 rounded-xl text-accent flex-1 px-4 py-3'>
					<div className='flex flex-row justify-between items-center text-xs leading-none'>
						Total Digests
						<DigestSvg className='size-4' />
					</div>
					<span className='block mt-2 font-semibold leading-none text-xl'>
						{digests?.length || <Skeleton />}
					</span>
				</div>

				<div className='bg-green-100 dark:bg-[#1F2937] !bg-opacity-50 rounded-xl text-custom-green flex-1 px-4 py-3'>
					<div className='flex flex-row justify-between items-center text-xs leading-none'>
						Active Channels
						<ConnectionSvg className='size-4' />
					</div>
					<span className='block mt-2 font-semibold leading-none text-xl'>
						{digests ? (
							digests.reduce((acc, digest) => acc + digest.channels.length, 0)
						) : (
							<Skeleton />
						)}
					</span>
				</div>
			</div>
		</>
	)
}
