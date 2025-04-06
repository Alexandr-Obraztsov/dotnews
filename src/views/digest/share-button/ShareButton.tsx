import { Button } from '@/shared/ui'
import Share from 'public/icons/share.svg'

type Props = {
	onClick: () => void
}

export const ShareButton = ({ onClick }: Props) => {
	return (
		<div
			className='mt-3 flex flex-row items-center bg-linear px-4 py-5 text-white rounded-xl cursor-pointer'
			onClick={onClick}
		>
			<div className='flex items-center justify-center gap-2 rounded-full size-10 bg-gray-200 bg-opacity-25'>
				<Share className='size-5' />
			</div>
			<div className='flex flex-col items-start gap-1 ml-4'>
				<h1 className='font-semibold text-base text-white leading-none'>
					Share Digest
				</h1>
				<p className='text-gray-200 text-xs'>Add to your friends</p>
			</div>
			<Button
				variant='fulfilled'
				sx='ml-auto bg-white text-purple-700 leading-none p-[10px_20px] rounded-full'
				effectSx='bg-purple-500'
			>
				Share
			</Button>
		</div>
	)
}
