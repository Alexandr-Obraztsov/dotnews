import { Button } from '@/shared/ui'
import Share from 'public/icons/share.svg'

export const ShareAppButton = () => {
	return (
		<div className=' flex flex-row items-center mt-4 bg-linear p-4 text-white rounded-lg'>
			<div className='flex items-center justify-center gap-2 rounded-full size-10 bg-gray-200 bg-opacity-25'>
				<Share />
			</div>
			<div className='flex flex-col items-start gap-1 ml-4'>
				<h1 className='font-medium text-lg text-white leading-none'>
					Share App
				</h1>
				<p className='text-gray-200 text-sm'>Invite your friends</p>
			</div>
			<Button
				variant='fulfilled'
				sx='ml-auto bg-white text-purple-700 leading-none p-[12px_20px]'
				effectSx='bg-purple-500'
			>
				Share
			</Button>
		</div>
	)
}
