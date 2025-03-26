import Skeleton from 'react-loading-skeleton'

export const LoadingDigest = () => {
	return (
		<div className='shrink-0 w-[150px] grow-[1] bg-foreground p-[25px] border-stroke border rounded-xl'>
			<Skeleton containerClassName='block h-[18px]' height={18} />
			<Skeleton containerClassName='block h-[14px] mt-[8px]' height={14} />

			<div className='mt-[16px] flex flex-row'>
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
		</div>
	)
}
