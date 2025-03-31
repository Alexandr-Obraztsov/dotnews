import { Digest } from '@/entities/digest/model/types'
import DigestSvg from 'public/icons/digest-small.svg'
import ConnectionSvg from 'public/icons/connection.svg'
import Skeleton from 'react-loading-skeleton'

type Props = {
	digests: Digest[] | undefined
}

export const Statistics = ({ digests }: Props) => {
	return (
		<div className='mt-4 flex flex-row gap-4'>
			<div className='bg-accent-foreground dark:bg-[#1F2937] dark:!bg-opacity-50 rounded-xl text-accent flex-1 p-4'>
				<div className='flex flex-row justify-between items-center text-sm leading-none'>
					Total Digests
					<DigestSvg className='size-4' />
				</div>
				<span className='block mt-4 font-semibold leading-none text-2xl'>
					{digests?.length || <Skeleton />}
				</span>
			</div>

			<div className='bg-green-100 dark:bg-[#1F2937] !bg-opacity-50 rounded-xl text-custom-green flex-1 p-4'>
				<div className='flex flex-row justify-between items-center text-sm leading-none'>
					Active Channels
					<ConnectionSvg className='size-4' />
				</div>
				<span className='block mt-4 font-semibold leading-none text-2xl'>
					{digests?.reduce(
						(acc, digest) => acc + digest.channels.length,
						0
					) || <Skeleton />}
				</span>
			</div>
		</div>
	)
}
