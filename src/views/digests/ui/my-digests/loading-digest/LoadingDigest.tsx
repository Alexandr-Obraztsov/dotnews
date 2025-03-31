import Skeleton from 'react-loading-skeleton'
import More from 'public/icons/more.svg'
import { IconButton } from '@/shared/ui/icon-button/IconButton'

export const LoadingDigest = () => {
	return (
		<div className='w-full bg-foreground p-6 border border-stroke shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl'>
			<Skeleton containerClassName='block h-[21px]' height={21} width={'80%'} />
			<div id='schedule' className='mt-5 flex flex-row gap-[6px]'>
				{Array(7)
					.fill(null)
					.map((_, index) => (
						<Skeleton
							key={index}
							containerClassName='block size-[24px]'
							height={24}
							width={24}
							circle
						/>
					))}
			</div>

			<div className='mt-6 flex flex-row items-center justify-between'>
				<div className='flex flex-row'>
					<Skeleton
						containerClassName='block size-[40px]'
						width={40}
						height={40}
						circle
					/>
					<Skeleton
						containerClassName='block size-[40px] ml-[-12px]'
						width={40}
						height={40}
						circle
					/>
					<Skeleton
						containerClassName='block size-[40px] ml-[-12px]'
						width={40}
						height={40}
						circle
					/>
				</div>
				<IconButton>
					<More />
				</IconButton>
			</div>
		</div>
	)
}
